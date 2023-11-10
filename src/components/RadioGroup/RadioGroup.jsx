import Label from '@components/Label';
import Text from '@components/Text';
import { RadioGroup as AriaRadioGroup } from 'react-aria-components';
import styled from 'styled-components';

const RadioGroup = ({ label, description, errorMessage, ...props }) => {
    return (
        <RadioGroupWrapper>
            {label && <Label>{label}</Label>}
            {description && <Description slot="description">{description}</Description>}
            <AriaRadioGroup {...props} />
            {errorMessage && <ErrorMessage slot="errorMessage">{errorMessage}</ErrorMessage>}
        </RadioGroupWrapper>
    );
};

const RadioGroupWrapper = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 0.5rem;
    width: 100%;
`;
const Description = styled(Text)`
    color: var(--neutral500);
`;
const ErrorMessage = styled(Text)`
    color: var(--alert500);
`;
export default RadioGroup;
