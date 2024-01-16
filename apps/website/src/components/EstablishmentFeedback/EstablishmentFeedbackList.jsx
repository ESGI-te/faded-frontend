import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';
import Text from 'shared/src/components/Text';
import { dayjs } from '@utils/dayjs';
import useEstablishmentFeedbackQuery from 'shared/src/queries/feedback/useEstablishmentFeedbackQuery.hook';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Button from 'shared/src/components/Button';
import EstablishmentFeedbackListPagination from './EstablishmentFeedbackListPagination';
import EstablishmentFeedbackListSkeleton from './EstablishmentFeedbackListSkeleton';

const EstablishmentFeedbackList = () => {
    const { establishmentId } = useParams();
    const [page, setPage] = useState(1);
    const { data: feedback, isLoading } = useEstablishmentFeedbackQuery(establishmentId, { page });

    if (isLoading) return <EstablishmentFeedbackListSkeleton />;

    return (
        <Wrapper>
            <List>
                {feedback.data?.map((f) => (
                    <Feedback key={f.id}>
                        <FeedbackNote>
                            <Text variant="bodyL" fontWeight="--fw-semibold">
                                {f.note}
                            </Text>
                            <StarIcon icon={icon({ name: 'star', style: 'solid' })} />
                        </FeedbackNote>
                        <Text color="--neutral500">{f.comment}</Text>
                        <Text>{dayjs(f.dateTime).format('DD/MM/YYYY')}</Text>
                    </Feedback>
                ))}
            </List>
            <EstablishmentFeedbackListPagination
                onChangePage={setPage}
                pagination={feedback.pagination}
            />
        </Wrapper>
    );
};

const Wrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    row-gap: 1.5rem;
`;
const FeedbackNote = styled.div`
    display: flex;
    column-gap: 0.5rem;
    align-items: center;
`;
const StarIcon = styled(FontAwesomeIcon)`
    width: 0.75rem;
    height: 0.75rem;
    color: var(--black);
`;
const Feedback = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 0.25rem;

    &:not(:last-child) {
        border-bottom: 1px solid var(--neutral100);
        padding-bottom: 1rem;
    }
`;
const List = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    row-gap: 1rem;
`;
const Pagination = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;
const PaginationButton = styled(Button)`
    color: var(--black);
    font-weight: var(--fw-normal);
`;

EstablishmentFeedbackList.propTypes = {
    feedback: PropTypes.shape({
        data: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.number.isRequired,
                note: PropTypes.number.isRequired,
                comment: PropTypes.string.isRequired,
                dateTime: PropTypes.string.isRequired,
                barber: PropTypes.object.isRequired,
                service: PropTypes.object.isRequired,
            }),
        ).isRequired,
        pagination: PropTypes.shape({
            current: PropTypes.number.isRequired,
            totalItems: PropTypes.number.isRequired,
            next: PropTypes.number,
            previous: PropTypes.number,
            perPage: PropTypes.number.isRequired,
            first: PropTypes.number.isRequired,
            last: PropTypes.number.isRequired,
        }).isRequired,
    }),
};

export default EstablishmentFeedbackList;
