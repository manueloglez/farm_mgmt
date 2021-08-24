import React, {useState, useEffect} from 'react'; 
import { Field, Polygon } from '../api';
import { List, Grid, Input } from 'semantic-ui-react';
import FieldsMap from './FieldsMap';

const FieldsList = ({user}) => {
  const [fields, setFields] = useState([]);
  const [search, setSearch] = useState('');
  const [polygons, setPolygons] = useState([])

  useEffect(() => {
    Field.index().then(setFields);
    if (user) {
      Polygon.index(user.id).then(setPolygons);
    }
  }, [user]);

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
            <FieldsMap polygons={polygons}/>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}

export default FieldsList;