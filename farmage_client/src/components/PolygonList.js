import React, {useState, useEffect} from 'react';
import { Button, Icon, List, Header } from 'semantic-ui-react';
import KmlUpload from './KmlUpload';
import { Link } from 'react-router-dom';
import { Polygon } from '../api';
import * as kml from 'tokml'
import * as parse from 'wellknown'

const PolygonList = ({polygons, field, user, selectedPolygon, setSelectedPolygon, setDraw, setGeometry, geometry, setPolygons}) => {
  const [creating, setCreating] = useState(false);

  const toggleKml = () => {
    setCreating(!creating);
    setDraw(!creating)
  }

  useEffect(() => {
    setSelectedPolygon(polygons[0]);
  }, [polygons]);

  const handleDelete = (id) => {
    if(window.confirm('Are you sure you want to delete this item?')){
      Polygon.destroy(id).then(() => {
        setPolygons(polygons.filter(f => f.id !== id));
      });
    }
  }

  const download = (filename, text) => {
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
  
    element.style.display = 'none';
    document.body.appendChild(element);
  
    element.click();
  
    document.body.removeChild(element);
  }

  const handleDownload = (polygon, field) => {
    const geoj = parse(polygon.geom)
    const kmlParsed = kml(geoj);
    download(`${field.name} - ${polygon.classification}.kml`, kmlParsed)
  }

  const handleEdit = () => {
    setDraw(true)
  }

  return (
    <>
      <Link to='/fields'>
        <Button size='tiny'><Icon name='long arrow alternate left'/>Back</Button>
      </Link>
      <Header as="h1" style={{marginBottom: '5px', marginTop: '10px'}}>{field.name}</Header>
      <p style={{marginBottom: '30px'}}>Crop type: <b>{field.crop_type}</b></p>
      <Header as="h3">Polygons</Header>
      <List relaxed>
        <List.Item >
          <List.Icon name='plus circle' size='large' color='green' verticalAlign='middle'/>
          <List.Content>
            <List.Header as='a' onClick={toggleKml}>New Polygon</List.Header>
            {creating ? 
              <KmlUpload user={user} field={field} toggleKml={toggleKml} setGeometry={setGeometry} geometry={geometry}/> : ''}
          </List.Content>
        </List.Item>
        {polygons.map(polygon => (
          <List.Item style={{padding: '5px', borderRadius:'5px', margin: '5px 0'}}
          key={polygon.id}
          className={polygon === selectedPolygon ? 'isActive' : 'isInactive'}
          onClick={() => {setSelectedPolygon(polygon)}}>
            <List.Content style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
              <div style={{display: 'flex', alignItems: 'center'}}>
                <List.Icon name='map' size='large' verticalAlign='middle' style={{margin: '0 15px 0 5px'}}/>
                <div>
                  <List.Header>{polygon.classification}</List.Header>
                  <List.Description>{polygon.area} ha</List.Description>
                </div>
              </div>
              <div>
                <Button size='tiny' onClick={() => {handleEdit()}}>
                  <Icon name='pencil' style={{margin: '0'}}/>
                </Button>
                <Button size='tiny' onClick={() => {handleDownload(polygon, field)}}>
                  <Icon name='download' style={{margin: '0'}}/>
                </Button>
                <Button size='tiny' onClick={() => {handleDelete(polygon.id)}}>
                  <Icon name='trash' style={{margin: '0'}}/>
                </Button>
              </div>
            </List.Content>
          </List.Item>
        ))}
      </List>
    </>
  );
}

export default PolygonList;