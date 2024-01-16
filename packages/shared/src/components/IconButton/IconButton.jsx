import PropTypes from "prop-types";
import Button from "shared/src/components/Button";
import styled from "styled-components";

const IconButton = ({ size, icon, ...props }) => (
	<ButtonStyled size={`${size}Icon`} startIcon={icon} {...props} />
);

const ButtonStyled = styled(Button)`
	&[data-focused] {
		outline: none;
	}
`;

IconButton.propTypes = {
	variant: PropTypes.oneOf(["primary", "secondary", "ghost"]),
	size: PropTypes.oneOf(["medium", "small"]),
	backgroundColor: PropTypes.string,
	color: PropTypes.string,
	icon: PropTypes.element.isRequired,
	isRound: PropTypes.bool,
	isDisabled: PropTypes.bool,
	isLoading: PropTypes.bool,
	"aria-label": PropTypes.string,
};

IconButton.defaultProps = {
	size: "medium",
};

export default IconButton;
