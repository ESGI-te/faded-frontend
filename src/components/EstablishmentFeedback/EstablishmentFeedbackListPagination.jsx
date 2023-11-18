import PropTypes from 'prop-types';
import styled from 'styled-components';
import Button from '@components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';

const EstablishmentFeedbackListPagination = ({ pagination, onChangePage }) => {
    const handleNextPage = () => {
        onChangePage(pagination.next);
    };

    const handlePreviousPage = () => {
        onChangePage(pagination.previous);
    };

    if (pagination.last === 1) return null;

    return (
        <Pagination>
            <PaginationButton
                variant="ghost"
                isDisabled={pagination.current === 1}
                startIcon={<FontAwesomeIcon icon={icon({ name: 'arrow-left', style: 'solid' })} />}
                onPress={handlePreviousPage}
            >
                Page précédente
            </PaginationButton>
            <PaginationButton
                variant="ghost"
                isDisabled={pagination.current === pagination.last}
                endIcon={<FontAwesomeIcon icon={icon({ name: 'arrow-right', style: 'solid' })} />}
                onPress={handleNextPage}
            >
                Page suivante
            </PaginationButton>
        </Pagination>
    );
};
const Pagination = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;
const PaginationButton = styled(Button)`
    color: var(--black);
    font-weight: var(--fw-normal);
    padding: 0;
`;

EstablishmentFeedbackListPagination.propTypes = {
    pagination: PropTypes.shape({
        current: PropTypes.number.isRequired,
        totalItems: PropTypes.number.isRequired,
        next: PropTypes.number,
        previous: PropTypes.number,
        perPage: PropTypes.number.isRequired,
        first: PropTypes.number.isRequired,
        last: PropTypes.number.isRequired,
    }).isRequired,
    onChangePage: PropTypes.func.isRequired,
};

EstablishmentFeedbackListPagination.defaultProps = {
    onChangePage: () => {},
};

export default EstablishmentFeedbackListPagination;
