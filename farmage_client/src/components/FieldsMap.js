import React from 'react'
import { MapContainer, TileLayer, Marker, Popup, MapConsumer } from 'react-leaflet'
import L from 'leaflet';
import omnivore from 'leaflet-omnivore';


const FieldsMap = ({polygons}) => {
  const addWktToMap = (map, polygons) => {
    const bounds = L.latLngBounds([]);
    for(let polygon of polygons) {
      let p = omnivore.wkt.parse(polygon.geom).addTo(map);
      bounds.extend(p.getBounds().getCenter())
    }
    return bounds
  }

  return (
    <MapContainer style={{height: '95vh', margin: '0'}} center={[49.212367, -122.921688]} zoom={13} scrollWheelZoom={false}>
      <MapConsumer>
        {(map) => {
          let bounds = addWktToMap(map, polygons);
          if(bounds.isValid()){
            map.fitBounds(bounds);
          }
          return null
        }}
      </MapConsumer>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
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