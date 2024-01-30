import { Switch as AriaSwitch } from "react-aria-components";
import styled from "styled-components";
import Stack from "../Stack";
import Label from "../Label";

const Switch = ({ label, ...props }) => {
	return (
		<Stack gap="0.5rem" align="start">
			<Label>{label}</Label>
			<Input {...props}>
				<Indicator />
			</Input>
		</Stack>
	);
};

const Indicator = styled.div`
	width: 1rem;
	height: 1rem;
	background-color: var(--white);
	border-radius: var(--r-full);
	transition: transform 0.2s ease-in-out;
`;
const Input = styled(AriaSwitch)`
	background-color: var(--neutral100);
	width: 2.5rem;
	border-radius: var(--r-full);
	padding: 0.25rem;
	transition: all 0.2s ease-in-out;
	cursor: pointer;

	&[data-selected] {
		background-color: var(--primary);

		& > ${Indicator} {
			transform: translateX(100%);
		}
	}
	&[data-disabled] {
		pointer-events: none;
		opacity: 0.5;
	}
`;

export default Switch;
