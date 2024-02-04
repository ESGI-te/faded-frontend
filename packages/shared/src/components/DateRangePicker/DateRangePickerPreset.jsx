import { useContext } from "react";
import { DateRangePickerStateContext } from "react-aria-components";
import Button from "../Button";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";

const DateRangePickerPreset = ({ value, children }) => {
	const state = useContext(DateRangePickerStateContext);
	const isActive =
		state.value?.start === value?.start && state.value?.end === value?.end;

	const onPress = () => {
		state.setDateRange(value);
	};

	return (
		<PresetButton $isActive={isActive} variant="secondary" onPress={onPress}>
			{children}
		</PresetButton>
	);
};

const PresetButton = styled(Button)`
	padding: 0.5rem 0.75rem;

	font-size: var(--fs-body-s);
	line-height: var(--lh-body-s);
	font-weight: var(--fw-bold);

	${({ $isActive }) =>
		$isActive &&
		css`
			background-color: var(--primary50);
			border-color: var(--primary);

			& > .button-text {
				color: var(--primary);
			}
		`}
`;

DateRangePickerPreset.propTypes = {
	children: PropTypes.node.isRequired,
	value: PropTypes.shape({
		start: PropTypes.object,
		end: PropTypes.object,
	}).isRequired,
};

export default DateRangePickerPreset;
