import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';
import Text from '@components/Text';
import { dayjs } from '@utils/dayjs';

const EstablishmentFeedbackList = ({ feedback }) => {
    return (
        <List>
            {feedback.map((f) => (
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
    );
};

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

EstablishmentFeedbackList.propTypes = {
    feedback: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            note: PropTypes.number.isRequired,
            comment: PropTypes.string.isRequired,
            dateTime: PropTypes.string.isRequired,
            barber: PropTypes.object.isRequired,
            service: PropTypes.object.isRequired,
        }),
    ).isRequired,
};

export default EstablishmentFeedbackList;
