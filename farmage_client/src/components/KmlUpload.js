import React from 'react';
import { Form, Button } from 'semantic-ui-react';
import { kml } from '@tmcw/togeojson'
import { DOMParser } from 'xmldom'
import { Polygon } from '../api';
import { useHistory } from 'react-router';


const KmlUpload = ({toggleKml, user, field, setGeometry, geometry}) => {
  const history = useHistory()

  const handleSubmit = (e) => {
    e.preventDefault()
    const { currentTarget } = e
    const formData = new FormData(currentTarget)
    const params = {
      classification: formData.get('classification'),
      geom: JSON.stringify(geometry),
      user: user.id,
    }
    Polygon.create(field.id, params).then((res) => {
      window.location.reload()
    })
    .catch(console.error)
  }

  const readKml = (event) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const parsedKML = new DOMParser().parseFromString(e.target.result, 'application/xml');
      const geojson = kml(parsedKML)
      let multipolygon = []
      for(let f of geojson.features) {
        if (f.geometry && f.geometry.coordinates) {
          multipolygon.push(f.geometry.coordinates)
        } else if (f.geometry && f.geometry.type === 'GeometryCollection') {
          for(let g of f.geometry.geometries) {
            if (g.type === 'Polygon') {
              multipolygon.push(g.coordinates)
            }
          }
        } else if (geojson.features.length === 1) {
          multipolygon = f.geometry.coordinates
        }
      }
      const output = {
        type: geojson.type !== 'FeatureCollection'? 'Polygon' : 'MultiPolygon',
        coordinates: multipolygon
      }
      setGeometry(output)
    };
    reader.readAsText(event.target.files[0]);
  }

  return (
    <div className="kml-upload">
      <div className="kml-upload__title">
        <h4 style={{marginBottom: '10px'}}>1. Select a classification for your polygon</h4>
      </div>
      <div className="kml-upload__input">

        <Form onSubmit={handleSubmit}>
          <Form.Field style={{marginBottom: '5px'}}>
            <input placeholder='Polygon Classification' name='classification'/>
          </Form.Field>
          <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <h4 style={{margin: '5px 0'}}>2a. Draw a polygon on the map</h4>
            <h4 style={{margin: '5px 0'}}>Or</h4>
            <h4 style={{margin: '5px 0'}}>2b. Upload a KML file instead</h4>
          </div>
          <input type="file" name="kml" accept=".kml" onChange={readKml}/>
          <Button.Group style={{marginTop: '10px', width: '100%'}}>
            <Button onClick={toggleKml}>Cancel</Button>
            <Button.Or />
            <Button positive>Create</Button>
          </Button.Group>
        </Form>
      </div>
    </div>
  );
}

export default KmlUpload;