import React, {useEffect, useState} from 'react'
import { Link, Router } from 'react-router-dom';
import { MapContainer, TileLayer, MapConsumer, FeatureGroup } from 'react-leaflet'
import * as L from 'leaflet';
import omnivore from 'leaflet-omnivore';
import ReactDOMServer from 'react-dom/server';


const FieldsMap = ({polygons, draw = false, geometry, setGeometry, preview, }) => {
  const [editableFG, setEditableFG] = useState(null);
  const [map, setMap] = useState(null);

  const Popup = ({ polygon }) => {
    return (
      <div>
        <a href={`/fields/${polygon.field_id}`}>Visit field</a>
      </div>
    );
  };

  const onFeatureGroupReady = reactFGref => {
    console.log('FeatureGroup ready', reactFGref);
    setEditableFG(reactFGref);
    
  };
  const addWktToMap = (map, polygons) => {
    // To avoid duplicated layers
    map.eachLayer(layer => {
      if(!layer._url) map.removeLayer(layer);
    });

    const bounds = L.latLngBounds([]);

    for(let polygon of polygons) {
      if ((preview && polygon.classification === 'base') || !preview) {
        let p = omnivore.wkt.parse(polygon.geom).addTo(map);
        if (preview) {
          const popupContent = ReactDOMServer.renderToString(
            <Popup polygon={polygon} />
          );
          p.bindPopup(popupContent)
        }
        bounds.extend(p.getBounds().getCenter())
      }
    }
    return bounds
  }
  
  const handleKmlLoad = (map, geometry) => {
    console.log('KML loaded');
    L.geoJSON(geometry).addTo(editableFG)
    editableFG.addTo(map)
    map.fitBounds(editableFG.getBounds())
  }

  useEffect(() => {
    if(geometry) {
      handleKmlLoad(map, geometry)
    }
    if (typeof L !== 'undefined' && map && draw) {
      map.pm.addControls({
        position: 'topleft',
        drawCircle: false,
        drawCircleMarker: false,
        drawPolyline: false,
        drawRectangle: false,
        drawMarker: false,
        drawPolygon: true,
        editMode: true,
        dragMode: false,
        cutPolygon: false,
        deleteMode: false,
        selectedPathOptions: {
          color: '#ff7800',
          weight: 5,
          opacity: 0.65
        },
        selectedPathInteractive: true,
        selectedPathDashArray: '10, 10',
        fullscreenControl: false,

        draw
      });
      map.on('pm:create', ({layer, shape}) => {
        console.log('pm:create', layer, shape);
        const geojson = L.polygon(layer._latlngs[0]).toGeoJSON().geometry;
        setGeometry(geojson)
        layer.addTo(map)
      });
      editableFG.on('pm:update', ({layer, shape}) => {
        console.log('edited')
        const geojson = L.polygon(layer._latlngs[0]).toGeoJSON().geometry;
        setGeometry(geojson)
      })
      console.log(editableFG)
    }
  }, [draw, geometry, map, editableFG])

  return (
    <MapContainer style={{height: '95vh', margin: '0'}} center={[49.212367, -122.921688]} zoom={13} scrollWheelZoom={false}>
      <FeatureGroup 
        ref={featureGroupRef => {
        onFeatureGroupReady(featureGroupRef) }}>
      </FeatureGroup> 
      <MapConsumer>
        {(map) => {
          setMap(map);
          let bounds = addWktToMap(map, polygons);
          if(bounds.isValid()){
            map.fitBounds(bounds);
          }
          console.log(map)
          return null
        }}
      </MapConsumer>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">Google Maps</a>'
        url='https://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}'
        subdomains={['mt0','mt1','mt2','mt3']}
      />
    </MapContainer>
  )
}

export default FieldsMap