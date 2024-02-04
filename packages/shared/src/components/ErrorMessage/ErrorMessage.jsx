import PropTypes from "prop-types";
import { Text as AriaText } from "react-aria-components";
import styled from "styled-components";

const ErrorMessage = ({ children, ...props }) => {
	return (
		<TextError {...props} slot="errorMessage">
			{children}
		</TextError>
	);
};

const TextError = styled(AriaText)`
	color: var(--alert);
	font-size: 0.75rem;
	font-weight: var(--fw-semibold);
`;

ErrorMessage.propTypes = {
	children: PropTypes.node,
};

export default ErrorMessage;
