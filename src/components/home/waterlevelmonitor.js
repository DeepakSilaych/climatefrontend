import React, { useState } from 'react';
import WaterlevelMap from './WaterlevelMap';
import WaterlevelWidget from './WaterlevelWidget';

export default function WaterlevelMonitor() {
  const [selectedStation, setSelectedStation] = useState(null);

  return (
    <div>
      <WaterlevelWidget 
        width="400px" 
        height="600px" 
        setLocation={setSelectedStation} 
        location={selectedStation} 
      />
      <WaterlevelMap 
        setLocation={setSelectedStation} 
        location={selectedStation} 
      />
    </div>
  );
}
