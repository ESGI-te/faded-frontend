import Text from '@components/Text';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useEstablishmentQuery from '@queries/establishment/useEstablishmentQuery.hook';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';
import EstablishmentCarousel from '@components/EstablishmentCarousel';
import { useEffect, useMemo, useState } from 'react';
import EstablishmentServicesAccordion from '@components/EstablishmentServicesAccordion';
import EstablishmentOpeningHours from '@components/EstablishmentOpeningHours';
import Stack from '@components/Stack';
import EstablishmentMap from '@components/EstablishmentMap';
import EstablishmentBarbers from '@components/EstablishmentBarbers';
import EstablishmentFeedback from '@components/EstablishmentFeedback';

const EstablishmentPage = () => {
    const { establishmentId } = useParams();
    const { data: establishment, isLoading } = useEstablishmentQuery(establishmentId);
    const [images, setImages] = useState([]);
    const noteCount = useMemo(() => establishment?.feedback.length, [establishment?.feedback]);
    const note = useMemo(() => {
        const sum = establishment?.feedback.reduce((acc, feedback) => acc + feedback.note, 0);
        return sum / noteCount;
    }, [establishment?.feedback, noteCount]);

    useEffect(() => {
        (async () => {
            const response = await fetch('https://picsum.photos/v2/list');
            const images = await response.json();
            setImages(images);
        })();
    }, []);

    if (isLoading) return <Page>Loading...</Page>; // TODO: Add skeleton

    return (
        <Page>
            <PageInnerWrapper>
                <ResponsiveWrapper>
                    <EstablishmentCarousel images={images} />
                    <EstablishmentInfo>
                        <Text as="h1" variant="headingM" fontWeight="--fw-bold">
                            {establishment.name}
                        </Text>
                        <InfoText>
                            <InfoIcon icon={icon({ name: 'location-dot', style: 'solid' })} />
                            {establishment.address}
                        </InfoText>
                        <InfoText>
                            <InfoIcon icon={icon({ name: 'star', style: 'regular' })} />
                            <span>{note}</span>
                            <span>({noteCount} avis)</span>
                        </InfoText>
                    </EstablishmentInfo>
                </ResponsiveWrapper>
                <TtitleWrapper>
                    <Text as="h2" variant="headingM" fontWeight="--fw-semibold">
                        Réserver en ligne chez {establishment.name}
                    </Text>
                    <Text as="h3" variant="bodyL" color="--neutral500">
                        24h/24 - Paiement sur place - Confirmation immédiate
                    </Text>
                </TtitleWrapper>
                <ResponsiveContentWrapper>
                    <Stack gap="2rem">
                        <EstablishmentServicesWrapper>
                            <Text as="h2" variant="headingM" fontWeight="--fw-semibold">
                                Les prestations
                            </Text>
                            <EstablishmentServicesAccordion services={establishment.services} />
                        </EstablishmentServicesWrapper>
                        <EstablishmentMapWrapper>
                            <Stack gap="0.25rem">
                                <Text as="h2" variant="headingM" fontWeight="--fw-semibold">
                                    Où se situe le salon ?
                                </Text>
                                <InfoText>
                                    <InfoIcon
                                        icon={icon({ name: 'location-dot', style: 'solid' })}
                                    />
                                    {establishment.address}
                                </InfoText>
                            </Stack>
                            <EstablishmentMap
                                position={{
                                    lat: establishment.latitude,
                                    lng: establishment.longitude,
                                }}
                            />
                        </EstablishmentMapWrapper>
                        <EstablishmentBarbersWrapper>
                            <Text as="h2" variant="headingM" fontWeight="--fw-semibold">
                                L'équipe
                            </Text>
                            <EstablishmentBarbers barbers={establishment.barbers} />
                        </EstablishmentBarbersWrapper>
                    </Stack>
                    <Stack gap="2rem">
                        <EstablishmentFeedback
                            note={note}
                            noteCount={noteCount}
                            feedback={establishment.feedback}
                        />
                        <EstablishmentOpeningHoursWrapper>
                            <Text as="h2" variant="headingM" fontWeight="--fw-semibold">
                                Les horaires d'ouverture
                            </Text>
                            <EstablishmentOpeningHours openingHours={establishment.openingHours} />
                        </EstablishmentOpeningHoursWrapper>
                    </Stack>
                </ResponsiveContentWrapper>
            </PageInnerWrapper>
        </Page>
    );
};

const Page = styled.section`
    min-height: 100%;
    width: 100%;
    display: flex;
    align-items: start;
    background-color: var(--neutral50);

    ${({ theme }) => theme.mediaQueries.desktopAndUp} {
        justify-content: center;
    }
`;
const PageInnerWrapper = styled.div`
    width: 100%;
    max-width: var(--container-width);
    display: flex;
    flex-direction: column;
    row-gap: 1rem;
    background-color: var(--neutral50);
    padding-bottom: var(--container-padding-mobile);

    ${({ theme }) => theme.mediaQueries.desktopAndUp} {
        row-gap: 2rem;
        padding-block: var(--container-padding);
    }
`;
const InfoText = styled(Text)`
    color: var(--neutral500);
    display: flex;
    column-gap: 0.25rem;
    align-items: center;
`;
const InfoIcon = styled(FontAwesomeIcon)`
    width: 0.875rem;
    height: 0.875rem;
    color: var(--neutral500);
`;
const ResponsiveWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    row-gap: 1.5rem;

    ${({ theme }) => theme.mediaQueries.desktopAndUp} {
        padding-inline: var(--container-padding);

        & > :first-child {
            order: 1;
        }
    }
`;
const EstablishmentInfo = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 0.25rem;
    padding-inline: var(--container-padding-mobile);
    padding-block: 0 var(--container-padding-mobile);

    ${({ theme }) => theme.mediaQueries.desktopAndUp} {
        padding: 0;
    }
`;
const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 1rem;
    width: 100%;
`;
const TtitleWrapper = styled.div`
    display: none;

    ${({ theme }) => theme.mediaQueries.desktopAndUp} {
        display: flex;
        flex-direction: column;
        row-gap: 0.25rem;
        padding-inline: var(--container-padding);
    }
`;
const EstablishmentServicesWrapper = Wrapper;
const EstablishmentOpeningHoursWrapper = Wrapper;
const EstablishmentMapWrapper = Wrapper;
const EstablishmentBarbersWrapper = Wrapper;
const ResponsiveContentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 1.5rem;
    padding-inline: var(--container-padding-mobile);

    ${({ theme }) => theme.mediaQueries.desktopAndUp} {
        padding-inline: var(--container-padding);
        flex-direction: row;
        column-gap: 2rem;

        & > :first-child {
            flex: 2;
        }
        & > :last-child {
            flex: 1;
        }
    }
`;

export default EstablishmentPage;
