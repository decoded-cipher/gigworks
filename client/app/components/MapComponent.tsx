'use client'

import React from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

interface MapComponentProps {
  position: [number, number]
  popupText?: string
}

const MapComponent: React.FC<MapComponentProps> = ({ 
  position, 
  popupText = 'Business Location' 
}) => {
  // Define custom icon inline
  const customIcon = new L.Icon({
    iconUrl: '/icon/marker-icon.png',
    iconRetinaUrl: '/icon/marker-icon.png',
    // shadowUrl: '/marker-shadow.png',
    iconSize: [35, 40],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  return (
    <MapContainer 
      center={position} 
      zoom={15} 
      scrollWheelZoom={false}
      style={{ height: '300px', width: '100%', borderRadius: '0.375rem' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position} icon={customIcon}>
        <Popup>
          {popupText}
        </Popup>
      </Marker>
    </MapContainer>
  )
}

export default MapComponent