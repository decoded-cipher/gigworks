import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

const LocationPicker = ({ onLocationSelect }) => {
  // Default to Kerala's approximate center (Thrissur)
  const KERALA_CENTER = { lat: 10.5276, lng: 76.2144 };

  const [position, setPosition] = useState(KERALA_CENTER);
  const [address, setAddress] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // Custom component to handle map clicks and location selection
  function LocationMarker() {
    const map = useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        setPosition(e.latlng);
        
        // Reverse geocoding to get address details
        fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`)
          .then(response => response.json())
          .then(data => {
            const fullAddress = data.display_name || 'Address not found';
            setAddress(fullAddress);
            
            // Optional: Pass location details back to parent component
            onLocationSelect && onLocationSelect({
              lat,
              lng,
              address: fullAddress
            });
          })
          .catch(error => console.error('Error fetching location details:', error));
      },
    });

    return position === null ? null : (
      <Marker position={position} />
    );
  }

  // Handle search for location
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}&limit=1`
      );
      const data = await response.json();

      if (data.length > 0) {
        const { lat, lon, display_name } = data[0];
        const newPosition = { lat: parseFloat(lat), lng: parseFloat(lon) };
        
        setPosition(newPosition);
        setAddress(display_name);
        
        // Optional: Pass location details back to parent component
        onLocationSelect && onLocationSelect({
          lat: newPosition.lat,
          lng: newPosition.lng,
          address: display_name
        });
      } else {
        alert('Location not found');
      }
    } catch (error) {
      console.error('Search error:', error);
      alert('Error searching for location');
    }
  };

  // Initial location set to Kerala's center
  useEffect(() => {
    // Set initial position to Kerala's center
    setPosition(KERALA_CENTER);
    
    // Optional: Fetch initial address for Kerala center
    fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${KERALA_CENTER.lat}&lon=${KERALA_CENTER.lng}&zoom=18&addressdetails=1`)
      .then(response => response.json())
      .then(data => {
        const fullAddress = data.display_name || 'Kerala, India';
        setAddress(fullAddress);
      })
      .catch(error => console.error('Error fetching initial location details:', error));
  }, [KERALA_CENTER]); // Added KERALA_CENTER to dependency array

  return (
    <div className="space-y-4">
      {/* Search Input */}
      <form onSubmit={handleSearch} className="flex space-x-2">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for a location"
          className="flex-1 border border-gray-300 rounded-md p-2"
        />
        <button 
          type="submit" 
          className="bg-[#303030] text-white px-4 py-2 rounded-md"
        >
          Search
        </button>
      </form>

      {/* Map Container */}
      <div className="w-full h-96 border border-gray-300 rounded-md overflow-hidden">
        <MapContainer 
          center={position} 
          zoom={8} 
          scrollWheelZoom={true}
          className="h-full w-full"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <LocationMarker />
        </MapContainer>
      </div>

      {/* Selected Location Details */}
      {position && (
        <div className="bg-gray-100 p-4 rounded-md">
          <p className="font-semibold">Selected Location:</p>
          <p className="text-sm text-gray-700">{address}</p>
        </div>
      )}
    </div>
  );
};

export default LocationPicker;