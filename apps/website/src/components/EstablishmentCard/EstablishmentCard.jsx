import Text from 'shared/src/components/Text';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from 'shared/src/components/Button';
import { Link } from 'react-router-dom';

const EstablishmentCard = ({ establishment }) => (
    <Card>
        <ImgWrapper />
        <InfoWrapper>
            <Text variant="headingS">{establishment.name} </Text>
            <InfoText>
                <InfoIcon icon={icon({ name: 'shoe-prints', style: 'solid' })} />
                <span>{Number(establishment.distance).toFixed(2)} km</span>
            </InfoText>
            <InfoText>
                <InfoIcon icon={icon({ name: 'location-dot', style: 'solid' })} />
                {establishment.address}
            </InfoText>
            <InfoText>
                <InfoIcon icon={icon({ name: 'star', style: 'regular' })} />
                <span>{Number(establishment.note).toFixed(1)}</span>
                <span>({establishment.noteCount} avis)</span>
            </InfoText>
            <AppointmentButton
                forwardedAs={Link}
                to={`/establishments/${establishment.id}`}
                variant="primary"
            >
                Réserver
            </AppointmentButton>
        </InfoWrapper>
    </Card>
);

const Card = styled.li`
    width: 100%;
    display: flex;
    flex-direction: column;

    ${({ theme }) => theme.mediaQueries.desktopLargeAndUp} {
        flex-direction: row;
    }
`;
const ImgWrapper = styled.div`
    width: 100%;
    height: 208px;
    background-color: var(--neutral100);
    border-radius: var(--r-s);

    ${({ theme }) => theme.mediaQueries.desktopLargeAndUp} {
        max-width: 300px;
    }
`;
const InfoWrapper = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 0.25rem;
    flex: 1;
    padding-block: 1rem;

    ${({ theme }) => theme.mediaQueries.desktopLargeAndUp} {
        padding-block: 0;
        padding-left: 1rem;
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
    background-color: var(--black);

    ${({ theme }) => theme.mediaQueries.desktopLargeAndUp} {
        margin-top: auto;
        align-self: flex-end;
    }
`;

EstablishmentCard.propTypes = {
    establishment: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        note: PropTypes.number.isRequired,
        address: PropTypes.string.isRequired,
        noteCount: PropTypes.number.isRequired,
        distance: PropTypes.number.isRequired,
    }),
};

export default EstablishmentCard;
