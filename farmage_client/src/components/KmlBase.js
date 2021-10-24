import React from 'react';
import { kml } from '@tmcw/togeojson'
import { DOMParser } from 'xmldom'


const KmlBase = ({setGeometry}) => {

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
    <>
      <div className="kml-upload__input">
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          <h4 style={{margin: '5px 0'}}>a. Draw a polygon on the map</h4>
          <h4 style={{margin: '5px 0'}}>Or</h4>
          <h4 style={{margin: '5px 0'}}>b. Upload a KML file instead</h4>
        </div>
        <input type="file" name="kml" accept=".kml" onChange={readKml}/>
      </div>
    </>
  );
}

export default KmlBase;