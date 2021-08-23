import React, {useState, useEffect} from 'react'; 
import { Field } from '../api';
import { List, Grid, Input } from 'semantic-ui-react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

const FieldsList = () => {
  const [fields, setFields] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    Field.index().then(setFields);

  }, []);

  const filterFields = (field) => { 
    let fullString = field.name + field['crop_type'] + field.location
    fullString = fullString.toLowerCase();
    const searchArr = search.toLowerCase().split(' ');
    return search ? searchArr.every(word => fullString.includes(word)) : true;
  }

  return (
    <Grid celled>
      <Grid.Row>
        <Grid.Column width={4}>
          <Input placeholder='Search...' style={{width: '100%'}} 
            onChange={(event, data) => {
              setSearch(data.value);
            }}
          />
          <List divided relaxed>
            {fields.filter(el => filterFields(el)).map(field => (
              <List.Item>
                <List.Icon name='github' size='large' verticalAlign='middle' />
                <List.Content>
                  <List.Header as='a'>{field.name}</List.Header>
                  <List.Description as='a'>{field.location} - {field.crop_type}</List.Description>
                </List.Content>
              </List.Item>
            ))}
          </List>
        </Grid.Column>
        <Grid.Column 
          width={12}
          style={{padding: '0'}}>
          <MapContainer style={{height: '90vh', margin: '0'}} center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[51.505, -0.09]}>
              <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
              </Popup>
            </Marker>
          </MapContainer>
        </Grid.Column>
      </Grid.Row>
    </Grid>

  );
}

export default FieldsList;