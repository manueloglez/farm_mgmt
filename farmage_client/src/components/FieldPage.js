import React, {useEffect, useState} from 'react';
import { Polygon, Field } from '../api';
import { Grid } from 'semantic-ui-react';
import FieldsMap from './FieldsMap';
import PolygonList from './PolygonList';
import { polygon } from 'leaflet';

const FieldPage = ({user, match}) => {
  const [field, setField] = useState({});
  const [polygons, setPolygons] = useState([]);
  const [selectedPolygon, setSelectedPolygon] = useState();

  useEffect(() => {
    Field.show(match.params.id).then(setField)
    Polygon.indexByField(match.params.id).then(polygons => {
      setPolygons(polygons);
      setSelectedPolygon(polygons[0]);
    })
  }, []);

  return (
  <Grid>
    <Grid.Row>
      <Grid.Column width={4}style={{padding: '10px 25px 0 30px'}}>
        <PolygonList polygons={polygons} field={field} user={user} selectedPolygon={selectedPolygon} setSelectedPolygon={setSelectedPolygon}/>
      </Grid.Column>
      <Grid.Column 
        width={12}
        style={{padding: '0'}}>
          <FieldsMap polygons={selectedPolygon ? [selectedPolygon] : []}/>
      </Grid.Column>
    </Grid.Row>
  </Grid>
  );
}

export default FieldPage;