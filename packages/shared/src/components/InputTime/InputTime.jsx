import React from "react";
import PropTypes from "prop-types";
import { DateInput, DateSegment, TimeField } from "react-aria-components";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import Label from "../Label";
import Stack from "../Stack";
import { parseTime } from "@internationalized/date";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

const InputTime = ({ label, value, onChange, ...props }) => {
	const parsedValue = typeof value === "string" ? parseTime(value) : value;

	const handleChange = (time) => {
		const format =
			props.granularity === "hour"
				? "HH"
				: props.granularity === "minute"
				? "HH:mm"
				: "HH:mm:ss";
		const formattedTime = dayjs(time.toString(), format).format(format);

		onChange(formattedTime);
	};

	return (
		<Stack gap="0.5rem" align="start">
			<Label>{label}</Label>
			<Input {...props} onChange={handleChange} value={parsedValue}>
				<ClockIcon
					icon={icon({ name: "clock", style: "regular" })}
					color="var(--neutral500)"
				/>
				<DateInputStyled>
					{(segment) => <DateSegment segment={segment} />}
				</DateInputStyled>
			</Input>
		</Stack>
	);
};

const Input = styled(TimeField)`
	display: flex;
	align-items: center;
	column-gap: 0.5rem;
	padding: 0.625rem 0.75rem;
	border-radius: var(--r-s);
	border: solid 1px var(--neutral300);
	height: 2.5rem;

	&[data-focused] {
		outline: 2px solid var(--primary50);
		border-color: var(--primary);
	}
	&[data-focused],
	&[data-invalid] {
		outline: 2px solid var(--alert50);
	}
	&[data-disabled] {
		pointer-events: none;
		color: var(--neutral500);
		background-color: var(--neutral50);
		border-color: var(--neutral100);
	}
	&[data-invalid] {
		border-color: var(--alert);
	}
	&[data-hovered] {
		border-color: var(--neutral500);
	}
`;
const DateInputStyled = styled(DateInput)`
	display: flex;
	align-items: center;
	column-gap: 0.5rem;
`;
const ClockIcon = styled(FontAwesomeIcon)`
	width: 1rem;
	height: 1rem;
	color: var(--neutral500);
`;

InputTime.propTypes = {
	granularity: PropTypes.oneOf(["hour", "minute", "second"]),
};

InputTime.defaultProps = {
	granularity: "minute",
};

export default InputTime;
