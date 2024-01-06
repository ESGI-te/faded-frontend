import PropTypes from 'prop-types';
import styled from 'styled-components';
import EstablishmentCard from '@components/EstablishmentCard';

const EstablishmentList = ({ establishments }) => {
    if (!establishments) return null;
    return (
        <List>
            {establishments.map((establishment) => (
                <EstablishmentCard key={establishment.id} establishment={establishment} />
            ))}
        </List>
    );
};

const List = styled.ul`
    display: flex;
    flex-direction: column;
    row-gap: 1rem;
    width: 100%;
    height: 100%;
`;

EstablishmentList.propTypes = {
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
};

export default EstablishmentList;
