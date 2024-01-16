import PropTypes from 'prop-types';
import styled from 'styled-components';
import EstablishmentCard from '@components/EstablishmentCard';
import Pagination from 'shared/src/components/Pagination';

const EstablishmentList = ({ establishments, pagination }) => {
    if (!establishments) return null;
    return (
        <ListWrapper>
            <List>
                {establishments.map((establishment) => (
                    <EstablishmentCard key={establishment.id} establishment={establishment} />
                ))}
            </List>
            <Pagination pagination={pagination} pagesRange={3} />
        </ListWrapper>
    );
};

const List = styled.ul`
    display: flex;
    flex-direction: column;
    row-gap: 1rem;
    width: 100%;
    height: 100%;
`;
const ListWrapper = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 1.5rem;
    padding-bottom: var(--container-padding-mobile);

    ${({ theme }) => theme.mediaQueries.desktopLargeAndUp} {
        padding-bottom: var(--container-padding);
    }
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
    pagination: PropTypes.shape({
        page: PropTypes.number.isRequired,
        perPage: PropTypes.number.isRequired,
        total: PropTypes.number.isRequired,
    }),
};

export default EstablishmentList;
