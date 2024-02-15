import PropTypes from "prop-types";
import {
	Modal as AriaModal,
	Dialog as AriaDialog,
	ModalOverlay,
} from "react-aria-components";
import styled from "styled-components";
import { AnimatePresence, motion } from "framer-motion";

const animationProps = {
	initial: { opacity: 0, translateY: 100 },
	animate: { opacity: 1, translateY: 0 },
	exit: { opacity: 0, translateY: 100 },
	transition: {
		type: "spring",
		stiffness: 200,
		damping: 12,
	},
};

const Modal = ({ className, children, size, ...props }) => {
	const overlayProps = props.onOpenChange
		? props
		: {
				isDismissable: props.isDismissable,
				isKeyboardDismissDisabled: props.isKeyboardDismissDisabled,
		  };

	return (
		<Overlay {...overlayProps}>
			<AnimatePresence>
				<ModalStyled
					{...props}
					{...animationProps}
					$size={size}
					className={className}
				>
					<Dialog>{children}</Dialog>
				</ModalStyled>
			</AnimatePresence>
		</Overlay>
	);
};

const sizeMatch = {
	small: "400px",
	medium: "600px",
	large: "800px",
};

const Overlay = styled(ModalOverlay)`
	background: hsla(0, 0%, 0%, 0.5);
	position: fixed;
	z-index: 100;
	inset: 0;
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 1rem;
`;
const ModalStyled = styled(motion(AriaModal))`
	max-width: ${(p) => sizeMatch[p.$size]};
	max-height: calc(100% - 2rem);
	overflow-y: auto;
	background: var(--white);
	border-radius: var(--r-l);
	width: 100%;
	padding: 1.5rem;
`;
const Dialog = styled(AriaDialog)`
	width: 100%;

	&:focus {
		outline: none;
	}
`;

/*  
    cf. react-aria Modal component
    https://react-spectrum.adobe.com/react-aria/Modal.html 
 */
Modal.propTypes = {
	isDismissable: PropTypes.bool,
	isKeyboardDismissDisabled: PropTypes.bool,
	isOpen: PropTypes.bool,
	defaultOpen: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
	className: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
	style: PropTypes.object,
	size: PropTypes.oneOf(["small", "medium", "large"]),
	onOpenChange: PropTypes.func,
};

Modal.defaultProps = {
	isDismissable: true,
	isKeyboardDismissDisabled: false,
	isOpen: false,
	defaultOpen: false,
	size: "medium",
};

export default Modal;
