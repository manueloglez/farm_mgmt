import React, {useState} from 'react';
import { Grid } from 'semantic-ui-react';
import FieldsMap from './FieldsMap';
import FieldForm from './FieldForm'
 
const NewField = ({user}) => {
  const [geometry, setGeometry] = useState(null);

  const handleSetGeometry = (geometry) => {
    setGeometry(geometry);
    console.log(geometry);
  }

  return (
    <Grid>
    <Grid.Row>
      <Grid.Column width={4}style={{padding: '10px 25px 0 30px'}}>
        <FieldForm user={user} geometry={geometry} setGeometry={handleSetGeometry}/>
      </Grid.Column>
      <Grid.Column 
        width={12}
        style={{padding: '0'}}>
          <FieldsMap polygons={[]} draw={true} geometry={geometry} setGeometry={handleSetGeometry}/>
      </Grid.Column>
    </Grid.Row>
  </Grid>  
  )
}

export default NewField;