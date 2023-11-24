import EstablishmentList from '@components/EstablishmentList';
import EstablishmentsMap from '@components/EstablishmentsMap';
import Text from '@components/Text';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import EstablishmentResultsSkeleton from './EstablishmentResultsSkeleton';

const EstablishmentResults = ({ establishments, isLoading, isMapVisible }) => {
    if (isLoading) return <EstablishmentResultsSkeleton />;

    if (establishments.length === 0) return <div>Aucun résultat</div>;

    return (
        <Wrapper>
            <EstablishmentsWrapper isMapVisible={isMapVisible}>
                <TitleWrapper>
                    <Text variant="headingS">
                        <FormattedMessage defaultMessage="Trouvez un salon" />
                    </Text>
                    <Text color="--neutral500">
                        <FormattedMessage defaultMessage="Les meilleurs salons de coiffure et barbers autour de chez vous" />
                    </Text>
                </TitleWrapper>
                <EstablishmentList establishments={establishments} />
            </EstablishmentsWrapper>
            <MapWrapper isMapVisible={isMapVisible}>
                <EstablishmentsMap establishments={establishments} />
            </MapWrapper>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    overflow-y: scroll;
    min-height: 0;

    ${({ theme }) => theme.mediaQueries.desktopLargeAndUp} {
        display: flex;
    }
`;
const EstablishmentsWrapper = styled.div`
    width: 100%;
    padding-inline: var(--container-padding-mobile);
    padding-bottom: var(--container-padding-mobile);

    ${({ theme }) => theme.mediaQueries.mobile} {
        ${({ isMapVisible }) => isMapVisible && 'display: none;'}
    }

    ${({ theme }) => theme.mediaQueries.desktopLargeAndUp} {
        max-width: 750px;
        height: 100%;
        padding-inline: var(--container-padding);
        padding-bottom: var(--container-padding);
    }
`;
const MapWrapper = styled.div`
    height: 100%;
    width: 100%;
    position: sticky;
    top: 0;
    display: none;

    ${({ theme }) => theme.mediaQueries.mobile} {
        ${({ isMapVisible }) => isMapVisible && 'display: flex;'}
    }

    ${({ theme }) => theme.mediaQueries.desktopLargeAndUp} {
        display: flex;
    }
`;
const TitleWrapper = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 0.25rem;
    padding-block: 1.5rem;
`;

EstablishmentResults.propTypes = {
    establishments: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            note: PropTypes.number.isRequired,
            address: PropTypes.string.isRequired,
            noteCount: PropTypes.number.isRequired,
            distance: PropTypes.number.isRequired,
        }),
    ),
    isLoading: PropTypes.bool.isRequired,
    isMapVisible: PropTypes.bool.isRequired,
};

export default EstablishmentResults;
