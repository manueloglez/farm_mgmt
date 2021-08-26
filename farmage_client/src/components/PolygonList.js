import React, {useState, useEffect} from 'react';
import { Button, Icon, List, Header } from 'semantic-ui-react';
import KmlUpload from './KmlUpload';
import { Link } from 'react-router-dom';

const PolygonList = ({polygons, field, user, selectedPolygon, setSelectedPolygon, setDraw, setGeometry, geometry}) => {
  const [selected, setSelected] = useState(null);
  const [creating, setCreating] = useState(false);

  const toggleKml = () => {
    setCreating(!creating);
    setDraw(!creating)
  }

  useEffect(() => {
    setSelectedPolygon(polygons[0]);
  }, [polygons]);

  return (
    <>
      <Link to='/fields'>
        <Button size='tiny'><Icon name='long arrow alternate left'/>Back</Button>
      </Link>
      <Header as="h1" style={{marginBottom: '5px', marginTop: '10px'}}>{field.name}</Header>
      <p style={{marginBottom: '30px'}}>Crop type: <b>{field.crop_type}</b></p>
      <Header as="h3">Polygons</Header>
      <List divided relaxed>
        <List.Item >
          <List.Icon name='plus circle' size='large' color='green' verticalAlign='middle' />
          <List.Content>
            <List.Header as='a' onClick={toggleKml}>New Polygon</List.Header>
            {creating ? <KmlUpload user={user} field={field} toggleKml={toggleKml} setGeometry={setGeometry} geometry={geometry}/> : ''}
          </List.Content>
        </List.Item>
        {polygons.map(polygon => (
          <List.Item style={{padding: '5px', borderRadius:'5px'}}
          key={polygon.id}
          className={polygon === selectedPolygon ? 'isActive' : null}
          onClick={() => {setSelectedPolygon(polygon)}}>
            <List.Icon name='map' size='large' verticalAlign='middle' />
            <List.Content>
              <List.Header as='a'>{polygon.classification}</List.Header>
              <List.Description as='a'>{polygon.area} ha</List.Description>
            </List.Content>
          </List.Item>
        ))}
      </List>
    </>
  );
}

export default PolygonList;