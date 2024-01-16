import PropTypes from "prop-types";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import IconButton from "shared/src/components/IconButton";

const ModalCloseButton = (props) => {
	return (
		<IconButtonStyled
			variant="ghost"
			icon={<CloseIcon icon={icon({ name: "xmark", style: "solid" })} />}
			{...props}
		/>
	);
};

const IconButtonStyled = styled(IconButton)`
	padding: 0;
`;
const CloseIcon = styled(FontAwesomeIcon)`
	width: 1rem;
	height: 1rem;
	color: var(--neutral500);
`;

ModalCloseButton.propTypes = {
	onPress: PropTypes.func,
};

ModalCloseButton.defaultProps = {
	onPress: () => {},
};

export default ModalCloseButton;
