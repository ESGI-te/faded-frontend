import React from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import PropTypes from 'prop-types';

const EstablishmentsMap = ({ position }) => {
    const mapRef = React.useRef(null);
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    });

    const onLoad = React.useCallback(
        (mapInstance) => {
            const bounds = new window.google.maps.LatLngBounds();
            bounds.extend(new window.google.maps.LatLng(position.lat, position.lng));
            mapRef.current = mapInstance;
            mapInstance.fitBounds(bounds);
        },
        [position],
    );

    if (!isLoaded) return null;

    return (
        <GoogleMap
            mapContainerStyle={{ height: '400px', width: '100%', borderRadius: 'var(--r-s)' }}
            onLoad={onLoad}
        >
            <Marker
                position={{
                    lat: position.lat,
                    lng: position.lng,
                }}
            />
        </GoogleMap>
    );
};

EstablishmentsMap.propTypes = {
    position: PropTypes.shape({
        lat: PropTypes.number.isRequired,
        lng: PropTypes.number.isRequired,
    }).isRequired,
};

export default EstablishmentsMap;
