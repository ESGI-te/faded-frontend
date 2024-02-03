import PropTypes from "prop-types";
import { Label as AriaLabel } from "react-aria-components";
import styled from "styled-components";

const Label = ({
	children,
	isRequired,
	isOptional,
	description,
	tooltip,
	...props
}) => {
	if (!children) return null;

	return (
		<LabelWrapper {...props}>
			<LabelTooltipWrapper>
				<LabelStyled isRequired={isRequired}>
					{children}
					{isRequired && (
						<Text as="span" fontWeight="--fw-semibold" color="--primary500">
							*
						</Text>
					)}
					{isOptional && (
						<OptionalLabel as="span">
							<FormattedMessage defaultMessage="(facultatif)" />
						</OptionalLabel>
					)}
				</LabelStyled>
				{tooltip}
			</LabelTooltipWrapper>
			{description && (
				<Description slot="description">{description}</Description>
			)}
		</LabelWrapper>
	);
};

const LabelWrapper = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
`;

const LabelTooltipWrapper = styled.div`
	display: flex;
	column-gap: 2px;
	align-items: center;
	width: 100%;
`;
const OptionalLabel = styled(Text)`
	padding-left: 0.25rem;
`;
const Description = styled(Text)`
	font-size: 12px;
	color: var(--neutral500);
`;
const LabelStyled = styled(AriaLabel)`
	font-weight: var(--fw-semibold);
	font-size: var(--fs-body-m);
	color: var(--black);
`;

Label.propTypes = {
	children: PropTypes.node,
};

export default Label;
