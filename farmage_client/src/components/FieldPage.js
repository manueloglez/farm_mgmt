import React, {useEffect, useState} from 'react';
import { Polygon, Field } from '../api';
import { Grid } from 'semantic-ui-react';
import FieldsMap from './FieldsMap';
import PolygonList from './PolygonList';

const FieldPage = ({user, match}) => {
  const [field, setField] = useState({});
  const [polygons, setPolygons] = useState([]);
  const [selectedPolygon, setSelectedPolygon] = useState();
  const [draw, setDraw] = useState(false);
  const [geometry, setGeometry] = useState(null);

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
        <PolygonList 
          polygons={polygons} field={field} user={user} 
          setPolygons={setPolygons}
          selectedPolygon={selectedPolygon} 
          setSelectedPolygon={setSelectedPolygon}
          setDraw={setDraw}
          setGeometry={setGeometry}
          geometry={geometry}
        />
      </Grid.Column>
      <Grid.Column 
        width={12}
        style={{padding: '0'}}>
          <FieldsMap setGeometry={setGeometry} geometry={geometry} polygons={selectedPolygon ? [selectedPolygon] : []} draw={draw}/>
      </Grid.Column>
    </Grid.Row>
  </Grid>
  );
}

export default FieldPage;