import React, {useEffect} from 'react'
import { MapContainer, TileLayer, Marker, Popup, MapConsumer, FeatureGroup } from 'react-leaflet'
import L, { circle, marker } from 'leaflet';
import omnivore from 'leaflet-omnivore';
import { EditControl } from "react-leaflet-draw"


const FieldsMap = ({polygons, draw = false}) => {
  const addWktToMap = (map, polygons) => {
    const bounds = L.latLngBounds([]);
    for(let polygon of polygons) {
      let p = omnivore.wkt.parse(polygon.geom).addTo(map);
      bounds.extend(p.getBounds().getCenter())
    }
    return bounds
  }

  useEffect(() => {
    console.log(draw)
  }, [draw])

  return (
    <MapContainer style={{height: '95vh', margin: '0'}} center={[49.212367, -122.921688]} zoom={13} scrollWheelZoom={false}>
      <FeatureGroup>
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