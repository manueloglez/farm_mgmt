import React, {useState, useEffect} from 'react'; 
import { Field } from '../api';
import { List, Grid } from 'semantic-ui-react';

const FieldsList = () => {
  const [fields, setFields] = useState([]);

  useEffect(() => {
    Field.index().then(setFields);

  }, []);

  return (
    <Grid celled>
      <Grid.Row>
        <Grid.Column width={7}>
          <List divided relaxed>
            {fields.map(field => (
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
        <Grid.Column width={9}>
        </Grid.Column>
      </Grid.Row>
    </Grid>

  );
}

export default FieldsList;