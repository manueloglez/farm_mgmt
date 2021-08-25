import React from 'react';
import { List, Grid, Input } from 'semantic-ui-react';
import FieldsMap from './FieldsMap';
import FieldForm from './FieldForm'
 
const NewField = ({user}) => {
  return (
    <Grid>
    <Grid.Row>
      <Grid.Column width={4}style={{padding: '10px 25px 0 30px'}}>
        <FieldForm user={user}/>
      </Grid.Column>
      <Grid.Column 
        width={12}
        style={{padding: '0'}}>
          <FieldsMap polygons={[]}/>
      </Grid.Column>
    </Grid.Row>
  </Grid>  
  )
}

export default NewField;