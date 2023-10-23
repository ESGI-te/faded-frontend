import PropTypes from 'prop-types';
import { Label as AriaLabel } from 'react-aria-components';
import styled from 'styled-components';

const Label = ({ children, ...props }) => {
    return <LabelStyled {...props}>{children}</LabelStyled>;
};

const LabelStyled = styled(AriaLabel)`
    font-weight: var(--fw-semibold);
    font-size: var(--fs-body-m);
    color: var(--black);
`;

Label.propTypes = {
    children: PropTypes.node,
};

export default Label;
