import PropTypes from "prop-types";
import styled from "styled-components";
import { UI_VARIANTS } from "../../utils/constants";

const variantColorLookup = {
	[UI_VARIANTS.INFO]: "--info",
	[UI_VARIANTS.ALERT]: "--alert",
	[UI_VARIANTS.SUCCESS]: "--success",
	[UI_VARIANTS.WARNING]: "--warning",
	[UI_VARIANTS.PRIMARY]: "--primary",
	[UI_VARIANTS.NEUTRAL]: "--neutral",
};

const Badge = ({ children, variant, ...props }) => (
	<StatusBadge {...props} $variant={variant}>
		{children}
	</StatusBadge>
);

const StatusBadge = styled.div`
	background-color: var(${({ $variant }) => variantColorLookup[$variant]}50);
	color: var(${({ $variant }) => variantColorLookup[$variant]}500);
	border-radius: var(--r-s);
	padding-inline: 0.5rem;
	padding-block: 0.25rem;
	font-size: var(--fs-body-s);
	font-weight: var(--fw-semibold);
	width: fit-content;
`;

Badge.propTypes = {
	variant: PropTypes.oneOf(Object.values(UI_VARIANTS)).isRequired,
};

Badge.defaultProps = {
	variant: UI_VARIANTS.PRIMARY,
};

export default Badge;
