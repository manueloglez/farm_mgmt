import React, {useState, useEffect} from 'react'; 
import { Field, Polygon } from '../api';
import { List, Grid, Input, Button, Icon } from 'semantic-ui-react';
import FieldsMap from './FieldsMap';
import { Link, useHistory } from 'react-router-dom';


const FieldsList = ({user}) => {
  const [fields, setFields] = useState([]);
  const [search, setSearch] = useState('');
  const [polygons, setPolygons] = useState([])
  const history = useHistory()

  useEffect(() => {
    Field.index().then(setFields);
    if (user) {
      Polygon.index(user.id).then(setPolygons);
    }
  }, [user]);

  const handleDelete = (id) => {
    if(window.confirm('Are you sure you want to delete this item?')){
      Field.destroy(id).then(() => {
        setFields(fields.filter(f => f.id !== id));
      });
    }
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
          <List relaxed>
            <List.Item className='isInactive' key={0} onClick={() => {history.push('/fields/new')}} verticalAlign='middle' 
            style={{padding: '5px', borderRadius:'5px', margin: '5px 0'}}>
              <List.Icon name='plus circle' style={{fontSize: '2em'}} color='teal' verticalAlign='middle' />
              <List.Content verticalAlign='middle'>
                <List.Header as='h3'>New Field</List.Header>
              </List.Content>
            </List.Item>
            {fields.filter(el => filterFields(el)).map(field => (
              <List.Item className='isInactive' key={field.id} style={{padding: '5px', borderRadius:'5px', margin: '5px 0'}}>
                <List.Content style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <Link to={`/fields/${field.id}`}>
                  <div style={{display: 'flex', alignItems: 'center'}}>
                    <List.Icon name='map marker alternate' size='large' verticalAlign='middle' style={{marginLeft: '5px'}} />
                    <div style={{marginLeft: '10px'}}>
                      <List.Header>{field.name}</List.Header>
                      <List.Description>{field.location} - {field.crop_type}</List.Description>
                    </div>
                  </div>
                </Link>
                  <Button size='tiny' onClick={() => {handleDelete(field.id)}}>
                    <Icon name='trash' style={{margin: '0'}}/>
                  </Button>
                </List.Content>
              </List.Item>
            ))}
          </List>
        </Grid.Column>
        <Grid.Column 
          width={12}
          style={{padding: '0'}}>
            <FieldsMap polygons={polygons} preview={true}/>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}

export default FieldsList;