import styled from 'styled-components';
import Button from 'shared/src/components/Button';
import { useAccordion } from 'shared/src/components/Accordion/useAccordion.hook';
import { FormattedMessage } from 'react-intl';

const NextButton = styled(Button)`
    margin-top: 1rem;
    box-shadow: var(--s-primary);
    align-self: flex-end;
`;

const EstablishmentFormAccordionNextStepButton = () => {
    const { goToNextIndex } = useAccordion();

    const onPress = () => {
        goToNextIndex();
    };

    return (
        <NextButton onPress={onPress}>
            <FormattedMessage defaultMessage="Suivant" />
        </NextButton>
    );
};

export default EstablishmentFormAccordionNextStepButton;
