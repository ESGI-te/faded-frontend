import React, { useState } from 'react';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';
import Text from '@components/Text';
import styled from 'styled-components';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '@components/Button';
import { Link } from 'react-router-dom';

const EstablishmentsMap = ({ establishments }) => {
    const mapRef = React.useRef(null);
    const [selectedEstablishment, setSelectedEstablishment] = useState(null);
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    });

    const onLoad = React.useCallback(
        (mapInstance) => {
            const bounds = new window.google.maps.LatLngBounds();
            establishments.forEach((office) => {
                bounds.extend(new window.google.maps.LatLng(office.lat, office.lng));
            });
            mapRef.current = mapInstance;
            mapInstance.fitBounds(bounds);
        },
        [establishments],
    );

    const onClickMarker = (establishmentId) => {
        setSelectedEstablishment(
            establishments.find((establishment) => establishment.id === establishmentId),
        );
    };

    if (!isLoaded) return null;

    return (
        <GoogleMap mapContainerStyle={{ height: '100%', width: '100%' }} onLoad={onLoad}>
            {establishments.map((establishment) => (
                <Marker
                    key={establishment.id}
                    onClick={() => onClickMarker(establishment.id)}
                    position={{
                        lat: establishment.lat,
                        lng: establishment.lng,
                    }}
                />
            ))}
            {selectedEstablishment && (
                <InfoWindow
                    position={{
                        lat: selectedEstablishment.lat,
                        lng: selectedEstablishment.lng,
                    }}
                    onCloseClick={() => setSelectedEstablishment(null)}
                >
                    <InfoWindowInnerWrapper>
                        <ImgWrapper />
                        <InfoWrapper>
                            <Text variant="headingS">{selectedEstablishment.name}</Text>
                            <InfoText>
                                <InfoIcon icon={icon({ name: 'location-dot', style: 'solid' })} />
                                {selectedEstablishment.address}
                            </InfoText>
                            <InfoText>
                                <InfoIcon icon={icon({ name: 'star', style: 'regular' })} />
                                <span>{selectedEstablishment.note}</span>
                                <span>({selectedEstablishment.noteCount} avis)</span>
                            </InfoText>
                        </InfoWrapper>
                        <AppointmentButton
                            forwardedAs={Link}
                            to={`/establishments/${selectedEstablishment.id}`}
                            variant="primary"
                        >
                            Prendre rendez-vous
                        </AppointmentButton>
                    </InfoWindowInnerWrapper>
                </InfoWindow>
            )}
        </GoogleMap>
    );
};

const InfoWindowInnerWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    row-gap: 1rem;
`;
const ImgWrapper = styled.div`
    width: 100%;
    height: 208px;
    background-color: var(--neutral100);
    border-radius: var(--r-s);
`;
const InfoWrapper = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 0.25rem;
    flex: 1;
    padding-block: 1rem;

    ${({ theme }) => theme.mediaQueries.desktopLargeAndUp} {
        padding-block: 0;
        padding-inline: 1rem;
    }
`;
const InfoIcon = styled(FontAwesomeIcon)`
    width: 0.875rem;
    height: 0.875rem;
    color: var(--neutral500);
`;
const InfoText = styled(Text)`
    color: var(--neutral500);
    display: flex;
    column-gap: 0.5rem;
    align-items: center;
`;
const AppointmentButton = styled(Button)`
    margin-top: 0.75rem;

    ${({ theme }) => theme.mediaQueries.desktopLargeAndUp} {
        margin-top: auto;
        align-self: flex-end;
    }
`;
const EstablishmentMarker = styled.div`
    width: 2rem;
    height: 2rem;
    padding: 1rem;
    background-color: var(--white);
`;

export default EstablishmentsMap;
