import React, {useState, useEffect} from 'react'; 
import { Field, Polygon } from '../api';
import { List, Grid, Input, Button, Icon } from 'semantic-ui-react';
import FieldsMap from './FieldsMap';
import { Link } from 'react-router-dom';

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

  const handleDelete = (id) => {
    Field.destroy(id).then(() => {
      setFields(fields.filter(f => f.id !== id));
    });
  }

  const filterFields = (field) => { 
    let fullString = field.name + field['crop_type'] + field.location
    fullString = fullString.toLowerCase();
    const searchArr = search.toLowerCase().split(' ');
    return search ? searchArr.every(word => fullString.includes(word)) : true;
  }

  return (
    <Grid>
      <Grid.Row>
        <Grid.Column width={4}style={{padding: '10px 25px 0 30px'}}>
          <Input placeholder='Search...' style={{width: '100%'}} 
            onChange={(event, data) => {
              setSearch(data.value);
            }}
          />
          <List divided relaxed>
            <List.Item key={0}>
              <List.Icon name='plus circle' size='large' color='green' verticalAlign='middle' />
              <List.Content>
                <List.Header><Link to='/fields/new'>New Field</Link></List.Header>
              </List.Content>
            </List.Item>
            {fields.filter(el => filterFields(el)).map(field => (
              <List.Item key={field.id}>
                <List.Content style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                  <div style={{display: 'flex'}}>
                    <List.Icon name='map marker alternate' size='large' verticalAlign='middle' />
                    <div>
                      <List.Header as='a'><Link to={`/fields/${field.id}`}>{field.name}</Link></List.Header>
                      <List.Description as='a'>{field.location} - {field.crop_type}</List.Description>
                    </div>
                  </div>
                  <Button size='small' onClick={() => {handleDelete(field.id)}}>
                    <Icon name='trash' />
                  </Button>
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