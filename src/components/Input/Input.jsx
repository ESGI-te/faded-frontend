import Spinner from '@components/Spinner';
import { Input as AriaInput } from 'react-aria-components';
import styled, { css } from 'styled-components';

const Input = ({ startIcon, endIcon, customButton, isLoading, ...props }) => {
    return (
        <InputWrapper $hasStartIcon={!!startIcon} $hasEndIcon={!!customButton || !!endIcon}>
            {startIcon}
            <StyledInput
                {...props}
                $hasStartIcon={!!startIcon}
                $hasEndIcon={!!customButton || !!endIcon}
            />
            {isLoading ? <Spinner color="--primary500" /> : customButton || endIcon}
        </InputWrapper>
    );
};

const InputWrapper = styled.div`
    width: 100%;
    position: relative;

    ${({ $hasStartIcon }) =>
        $hasStartIcon &&
        css`
            & > :first-child {
                position: absolute;
                top: 50%;
                left: 1rem;
                transform: translateY(-50%);
            }
        `}

    ${({ $hasEndIcon }) =>
        $hasEndIcon &&
        css`
            & > :last-child {
                position: absolute;
                top: 50%;
                right: 1rem;
                transform: translateY(-50%);
            }
        `}
`;
const StyledInput = styled(AriaInput)`
    height: 3rem;
    padding: 1rem;
    border: solid var(--black) 1px;
    border-radius: var(--r-s);
    width: 100%;
    background-color: var(--white);

    &[type='search']::-webkit-search-cancel-button,
    &::-webkit-search-decoration {
        -webkit-appearance: none;
        appearance: none;
    }

    &[data-disabled] {
        cursor: not-allowed;
        pointer-events: none;
        color: var(--neutral500);
        background-color: var(--neutral50);
        border-color: var(--neutral100);
    }

    &[data-invalid] {
        border-color: var(--alert500);
    }

    &[data-focused] {
        outline: solid 2px var(--primary);
    }

    &[data-hovered] {
        border-color: var(--primary);
    }

    &[data-invalid],
    &[data-focused] {
        outline: solid 2px var(--alert50);
    }

    &:read-only {
        color: var(--neutral500);
        border-color: var(--neutral300);
    }

    ${({ $hasStartIcon }) => $hasStartIcon && `padding-left: 2.5rem;`}
    ${({ $hasEndIcon }) => $hasEndIcon && `padding-right: 2.5rem;`}
`;

export default Input;
