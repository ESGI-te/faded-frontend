import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import styled from "styled-components";
import { UI_VARIANTS } from "../../utils/constants";
import { css } from "styled-components";

const iconLookup = {
	[UI_VARIANTS.SUCCESS]: icon({ name: "circle-check", style: "solid" }),
	[UI_VARIANTS.ALERT]: icon({ name: "circle-exclamation", style: "solid" }),
	[UI_VARIANTS.INFO]: icon({ name: "circle-info", style: "solid" }),
	[UI_VARIANTS.WARNING]: icon({ name: "triangle-exclamation", style: "solid" }),
	[UI_VARIANTS.NEUTRAL]: icon({ name: "circle-question", style: "solid" }),
};

const colorLookup = {
	[UI_VARIANTS.SUCCESS]: "--success",
	[UI_VARIANTS.ALERT]: "--alert",
	[UI_VARIANTS.INFO]: "--info",
	[UI_VARIANTS.WARNING]: "--warning",
	[UI_VARIANTS.NEUTRAL]: "--neutral",
};

const Alert = ({ description, variant, icon, children, ...props }) => {
	return (
		<AlertWrapper $variant={variant} {...props}>
			{icon || <AlertIcon icon={iconLookup?.[variant]} />}
			<FlexWrapper>
				<Heading>{children}</Heading>
				{description && <Description>{description}</Description>}
			</FlexWrapper>
		</AlertWrapper>
	);
};

const Heading = styled.p`
	font-size: var(--fs-body-m);
	font-weight: var(--fw-semibold);
	line-height: var(--lh-body-m);
`;
const AlertIcon = styled(FontAwesomeIcon)`
	width: 0.75rem;
	height: 0.75rem;
	padding-top: 0.25rem;
`;
const AlertWrapper = styled.div`
	display: flex;
	align-items: start;
	column-gap: 0.75rem;
	background-color: var(--primary50);
	border-radius: var(--r-m);
	padding: 0.75rem;

	${({ $variant }) => css`
		background-color: var(${colorLookup[$variant]}50);

		& > ${AlertIcon} {
			color: var(${colorLookup[$variant]});
		}
	`};
`;
const FlexWrapper = styled.div`
	display: flex;
	flex-direction: column;
	flex: 1;
`;
const Description = styled.p`
	font-size: var(--fs-body-m);
`;

Alert.propTypes = {};

export default Alert;
