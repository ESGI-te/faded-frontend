import PropTypes from 'prop-types';
import styled from 'styled-components';
import Text from 'shared/src/components/Text';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';
import { FormattedMessage } from 'react-intl';

const EstablishmentFeedbackNote = ({ note, noteCount }) => {
    return (
        <FeedbackNoteWrapper>
            <Note>
                <Text as="span" color="--white" fontWeight="--fw-bold" variant="bodyL">
                    {note ? note.toFixed(1) : 0}
                </Text>
                <StarIcon icon={icon({ name: 'star', style: 'solid' })} />
            </Note>
            <Text>
                <FormattedMessage
                    defaultMessage="{noteCount} personnes ont donné leur avis"
                    values={{
                        noteCount,
                    }}
                />
            </Text>
        </FeedbackNoteWrapper>
    );
};

const FeedbackNoteWrapper = styled.div`
    display: flex;
    align-items: center;
    column-gap: 1rem;
`;
const Note = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    column-gap: 0.5rem;
    height: 4rem;
    width: 4rem;
    border-radius: var(--r-s);
    background-color: var(--black);
`;
const StarIcon = styled(FontAwesomeIcon)`
    width: 1rem;
    height: 1rem;
    color: var(--white);
`;

EstablishmentFeedbackNote.propTypes = {
    note: PropTypes.number.isRequired,
    noteCount: PropTypes.number.isRequired,
};

export default EstablishmentFeedbackNote;
