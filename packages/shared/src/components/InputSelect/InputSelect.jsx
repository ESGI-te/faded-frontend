import {
	Select,
	ListBox as AriaListBox,
	Button,
	SelectValue,
} from "react-aria-components";
import PropTypes from "prop-types";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import Label from "../Label";
import { useRef } from "react";
import ListBoxItem from "../ListBoxItem";
import Dropdown from "../Dropdown";

const InputSelect = ({
	isOptional,
	isRequired,
	tooltip,
	description,
	label,
	endIcon,
	startIcon,
	errorMessage,
	children,
	items,
	loadMoreEnabled,
	noBorder,
	...props
}) => {
	const triggerRef = useRef(null);

	return (
		<InputWrapper {...props} ref={triggerRef}>
			<Label
				isOptional={isOptional}
				isRequired={isRequired}
				tooltip={tooltip}
				description={description}
			>
				{label}
			</Label>
			<InputButton $noBorder={noBorder}>
				<SelectValue />
				<span>
					<ChevronIcon icon={icon({ name: "chevron-down", style: "solid" })} />
				</span>
			</InputButton>
			<Dropdown
				shouldFlip={false}
				placement="bottom"
				offset={4}
				triggerRef={triggerRef}
			>
				<ListBox items={items}>
					{children ||
						((item) => <ListBoxItem id={item.id}>{item.name}</ListBoxItem>)}
				</ListBox>
				{loadMoreEnabled && (
					<FetchMoreButton onClick={onLoadMore}>
						<FormattedMessage defaultMessage="Charger plus" />
					</FetchMoreButton>
				)}
			</Dropdown>
		</InputWrapper>
	);
};

const InputButton = styled(Button)`
	height: 2.5rem;
	padding: 1rem;
	border: solid var(--neutral300) 1px;
	border-radius: var(--r-s);
	width: 100%;
	background-color: var(--white);
	display: flex;
	align-items: center;
	justify-content: space-between;
	column-gap: 0.5rem;
	cursor: pointer;

	${({ $noBorder }) => $noBorder && "border: none;"}

	&[data-disabled] {
		cursor: not-allowed;
		pointer-events: none;
		color: var(--neutral500);
		background-color: var(--neutral50);
		border-color: var(--neutral500);
	}

	&[data-hovered] {
		border-color: var(--primary500);
	}

	&[data-focused] {
		outline: 2px solid var(--primary500);
	}

	&[data-invalid] {
		border-color: var(--alert500);
	}

	&[data-invalid] + &[data-focused] {
		outline: solid 2px var(--alert50);
	}
`;
const InputWrapper = styled(Select)`
	display: flex;
	flex-direction: column;
	row-gap: 0.5rem;
	width: 100%;
	position: relative;

	.react-aria-SelectValue {
		min-width: 0;
		&[data-placeholder] {
			color: var(--neutral200);
		}
	}
`;
const ListBox = styled(AriaListBox)`
	display: flex;
	flex-direction: column;
`;
const ChevronIcon = styled(FontAwesomeIcon)`
	font-size: 0.75rem;
	color: var(--neutral500);
`;

InputSelect.propTypes = {
	items: PropTypes.arrayOf(PropTypes.object),
	onSelectionChange: PropTypes.func,
	label: PropTypes.string,
	endIcon: PropTypes.node,
	startIcon: PropTypes.node,
	errorMessage: PropTypes.string,
	children: PropTypes.node,
	value: PropTypes.string,
	noBorder: PropTypes.bool,
};

InputSelect.defaultProps = {
	noBorder: false,
};

export default InputSelect;
