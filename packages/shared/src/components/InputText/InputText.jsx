import { TextField } from "react-aria-components";
import PropTypes from "prop-types";
import styled from "styled-components";
import Text from "../Text";
import Input from "../Input";
import Label from "../Label";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon as iconFA } from "@fortawesome/fontawesome-svg-core/import.macro";

const InputText = ({
	label,
	description,
	errorMessage,
	isInvalid,
	startIcon,
	endIcon,
	customButton,
	...props
}) => {
	const hasError = isInvalid || !!errorMessage;
	const icon = hasError ? (
		<ErrorIcon icon={iconFA({ name: "circle-exclamation", style: "solid" })} />
	) : (
		endIcon
	);

	return (
		<InputWrapper {...props} isInvalid={hasError}>
			<LabelWrapper>
				<Label>{label}</Label>
				{customButton}
			</LabelWrapper>
			<Input startIcon={startIcon} endIcon={icon} />
			{description && (
				<Description slot="description">{description}</Description>
			)}
			{errorMessage && (
				<ErrorMessage slot="errorMessage">{errorMessage}</ErrorMessage>
			)}
		</InputWrapper>
	);
};

const LabelWrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	column-gap: 0.5rem;
`;
const InputWrapper = styled(TextField)`
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
const ErrorIcon = styled(FontAwesomeIcon)`
	font-size: 1rem;
	color: var(--alert500);
`;

InputText.propTypes = {
	label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
	description: PropTypes.string,
	errorMessage: PropTypes.string,
	isInvalid: PropTypes.bool,
	startIcon: PropTypes.element,
	endIcon: PropTypes.element,
};

InputText.defaultProps = {
	isInvalid: false,
};

export default InputText;
