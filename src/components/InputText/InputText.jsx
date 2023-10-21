import { Label, TextField, Input } from 'react-aria-components';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Text from '@components/Text';

const InputText = ({ label, description, errorMessage, isInvalid, ...props }) => {
    const hasError = isInvalid || !!errorMessage;

    return (
        <InputWrapper {...props} isInvalid={hasError} isReadOnly>
            <Label>{label}</Label>
            <StyledInput />
            {description && <Description slot="description">{description}</Description>}
            {errorMessage && <ErrorMessage slot="errorMessage">{errorMessage}</ErrorMessage>}
        </InputWrapper>
    );
};

const InputWrapper = styled(TextField)`
    display: flex;
    flex-direction: column;
    row-gap: 0.5rem;
`;
const StyledInput = styled(Input)`
    height: 3rem;
    padding: 1rem;
    border: solid var(--black) 1px;
    border-radius: var(--r-s);
    width: 100%;

    &[data-disabled] {
        cursor: not-allowed;
        pointer-events: none;
        color: var(--neutral500);
        background-color: var(--neutral50);
        border-color: var(--neutral500);
    }

    &[data-invalid] {
        border-color: var(--alert500);
    }

    &:read-only {
        color: var(--neutral500);
        border-color: var(--neutral300);
    }
`;
const Description = styled(Text)`
    color: var(--neutral500);
`;
const ErrorMessage = styled(Text)`
    color: var(--alert500);
`;

InputText.propTypes = {
    label: PropTypes.string.isRequired,
    description: PropTypes.string,
    errorMessage: PropTypes.string,
    isInvalid: PropTypes.bool,
};

InputText.defaultProps = {
    isInvalid: false,
};

export default InputText;
