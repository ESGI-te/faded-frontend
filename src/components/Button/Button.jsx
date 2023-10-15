import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import Text from '@components/Text';

const Button = ({ children, startIcon, endIcon, ...props }) => {
    const disabled = props.isDisabled || props.isLoading;
    return (
        <ButtonStyled {...props} disabled={disabled}>
            {startIcon}
            {children && <Text as="span">{children}</Text>}
            {endIcon}
            {/* TODO: Add loading icon */}
        </ButtonStyled>
    );
};

const sizes = {
    medium: css`
        padding: 0.625rem 1rem;
    `,
    mediumIcon: css`
        padding: 0.625rem;
    `,
    small: css`
        padding: 0.375rem 0.75rem;
    `,
    smallIcon: css`
        padding: 0.375rem;
    `,
};

const ButtonStyled = styled.button`
    display: inline-flex;
    column-gap: 0.5rem;
    align-items: center;
    justify-content: center;
    padding: 0.5rem 1rem;
    cursor: pointer;
    text-decoration: none;
    border: none;
    background-color: ${(props) => `var(${props.backgroundColor})`};
    color: ${(props) => `var(--${props.color}`};
    border-radius: var(--r-full);
    transition-duration: 200ms;
    transition-property: opacity, background-color, color;

    ${(props) => sizes[props.$size]}

    ${(props) =>
        props.disabled &&
        css`
            opacity: 0.5;
            cursor: not-allowed;
            pointer-events: none;
        `}
`;

Button.propTypes = {
    size: PropTypes.oneOf(['small', 'medium', 'full', 'smallIcon', 'mediumIcon']),
    startIcon: PropTypes.node,
    endIcon: PropTypes.node,
    variant: PropTypes.oneOf(['primary', 'secondary', 'ghost']),
    children: PropTypes.node.isRequired,
    color: PropTypes.string,
    backgroundColor: PropTypes.string,
    isDisabled: PropTypes.bool,
    isLoading: PropTypes.bool,
    onClick: PropTypes.func,
};

Button.defaultProps = {
    color: '--white',
    backgroundColor: '--primary',
    variant: 'primary',
    size: 'medium',
};

export default Button;
