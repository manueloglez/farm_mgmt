import React, {useEffect, useState} from 'react'
import { MapContainer, TileLayer, Marker, Popup, MapConsumer, FeatureGroup } from 'react-leaflet'
import L from 'leaflet';
import omnivore from 'leaflet-omnivore';
import { EditControl } from "react-leaflet-draw"


const FieldsMap = ({polygons, draw = false, geometry}) => {
  const [editableFG, setEditableFG] = useState(null);
  const [map, setMap] = useState(null);

  const onFeatureGroupReady = reactFGref => {
    setEditableFG(reactFGref);
  };
  const addWktToMap = (map, polygons) => {
    // To avoid duplicated layers
    if (map._layers){
      const drawnItems = map._layers;
      Object.keys(drawnItems).forEach((layerid, index) => {
        const layer = drawnItems[layerid];
        if(!layer._url) map.removeLayer(layer);
      });
    }

    const bounds = L.latLngBounds([]);
    for(let polygon of polygons) {
      let p = omnivore.wkt.parse(polygon.geom).addTo(map);
      bounds.extend(p.getBounds().getCenter())
    }
    return bounds
  }

  const handleKmlLoad = (map, geometry) => {
    L.geoJSON(geometry).addTo(editableFG)
    editableFG.addTo(map)
    map.fitBounds(editableFG.getBounds())
  }

  useEffect(() => {
    console.log(draw)
    if(geometry) {
      handleKmlLoad(map, geometry)
    }
  }, [draw, geometry])

  return (
    <MapContainer style={{height: '95vh', margin: '0'}} center={[49.212367, -122.921688]} zoom={13} scrollWheelZoom={false}>
      <FeatureGroup 
        ref={featureGroupRef => {
        onFeatureGroupReady(featureGroupRef) }}>
        {!draw ? 
          <EditControl
            position='topleft'
            draw={{
              rectangle: false,
              circle: false,
              marker: false,
              polyline: false,
              circlemarker: false,
              polygon: false,
            }}
            edit={{
              remove: false,
              edit: false,
            }}
          /> : 
          <EditControl
          position='topleft'
          draw={{
            rectangle: false,
            circle: false,
            marker: false,
            polyline: false,
            circlemarker: false,
          }}
        /> }
      </FeatureGroup> 
      <MapConsumer>
        {(map) => {
          setMap(map);
          let bounds = addWktToMap(map, polygons);
          if(bounds.isValid()){
            map.fitBounds(bounds);
          }
          return null
        }}
      </MapConsumer>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">Google Maps</a>'
        url='https://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}'
        subdomains={['mt0','mt1','mt2','mt3']}
      />
      <Marker position={[49.212367, -122.921688]}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  )
}

export default FieldsMap