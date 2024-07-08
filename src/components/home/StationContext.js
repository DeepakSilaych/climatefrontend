import React, { createContext, useState } from 'react';

export const StationContext = createContext();

export const StationProvider = ({ children }) => {
    const [selectedStation, setSelectedStation] = useState(null);

    return (
        <StationContext.Provider value={{ selectedStation, setSelectedStation }}>
            {children}
        </StationContext.Provider>
    );
};
