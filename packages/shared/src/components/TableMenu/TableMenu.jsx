import PropTypes from "prop-types";
import { Button, DialogTrigger, Popover } from "react-aria-components";
import MenuDropdown from "../MenuDropdown";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

const TableMenu = ({ isOpen, onOpenChange, children, onAction }) => {
	return (
		<DialogTrigger>
			<TriggerButton aria-label="Menu" onPress={() => onOpenChange(true)}>
				<EllipsisIcon icon={icon({ name: "ellipsis", style: "solid" })} />
			</TriggerButton>
			<PopoverStyled
				placement="bottom right"
				isOpen={isOpen}
				onOpenChange={onOpenChange}
			>
				<MenuDropdown onAction={onAction}>{children}</MenuDropdown>
			</PopoverStyled>
		</DialogTrigger>
	);
};

const TriggerButton = styled(Button)`
	padding: 0;
	background: none;
	border: none;
	cursor: pointer;

	&[data-focused] {
		outline: none;
	}
`;
const EllipsisIcon = styled(FontAwesomeIcon)`
	width: 1rem;
	height: 1rem;
	color: var(--neutral500);
`;
const PopoverStyled = styled(Popover)`
	width: 100%;
	max-width: 10rem;
	z-index: 1 !important;
`;

TableMenu.propTypes = {
	children: PropTypes.node.isRequired,
	isOpen: PropTypes.bool.isRequired,
	onOpenChange: PropTypes.func.isRequired,
	onAction: PropTypes.func.isRequired,
};

TableMenu.defaultProps = {
	isOpen: false,
	onOpenChange: () => {},
};

export default TableMenu;
