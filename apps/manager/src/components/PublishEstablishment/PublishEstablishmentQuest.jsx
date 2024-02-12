import PropTypes from 'prop-types';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';
import Text from 'shared/src/components/Text';
import Stack from 'shared/src/components/Stack';
import Link from 'shared/src/components/Link';
import { FormattedMessage } from 'react-intl';

const PublishEstablishmentQuest = ({ steps, onClose }) => {
    if (!steps) return null;

    return (
        <Stack gap="0.5rem">
            {steps.map((step, index) => (
                <QuestItem key={index}>
                    <Circle $isChecked={step.check}>
                        {step.check && (
                            <CheckIcon icon={icon({ name: 'circle-check', style: 'solid' })} />
                        )}
                    </Circle>
                    <Text>
                        {step.message}{' '}
                        {!step.check && (
                            <QuestItemLink onClick={onClose} to={step.link}>
                                <FormattedMessage defaultMessage="C'est parti !" />
                            </QuestItemLink>
                        )}
                    </Text>
                </QuestItem>
            ))}
        </Stack>
    );
};

const Circle = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 1rem;
    height: 1rem;
    border-radius: var(--r-full);
    border: 1px solid var(--neutral200);
    flex-shrink: 0;

    ${({ $isChecked }) => $isChecked && `border-color: var(--success);`}
`;
const CheckIcon = styled(FontAwesomeIcon)`
    color: var(--success);
    width: 100%;
    height: 100%;
`;
const QuestItem = styled.div`
    display: flex;
    align-items: center;
    column-gap: 0.5rem;
`;
const QuestItemLink = styled(Link)`
    font-weight: var(--fw-semibold);
    color: var(--primary);
`;

PublishEstablishmentQuest.propTypes = {
    steps: PropTypes.arrayOf(PropTypes.shape({ message: PropTypes.string, check: PropTypes.bool })),
    onClose: PropTypes.func,
};

export default PublishEstablishmentQuest;
