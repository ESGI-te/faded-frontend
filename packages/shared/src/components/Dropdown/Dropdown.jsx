import React, { useContext } from "react";
import { Popover, ComboBoxStateContext } from "react-aria-components";
import styled, { keyframes } from "styled-components";
import useResponsive from "../../hooks/useResponsive.hook";
import usePreventBodyScroll from "../../hooks/usePreventBodyScroll.hook";

const Dropdown = (props) => {
	const { isMobileOrTablet } = useResponsive();
	const state = useContext(ComboBoxStateContext);
	// usePreventBodyScroll(state?.isOpen && isMobileOrTablet);
	const trriggerWidth = props.triggerRef?.current
		? props.triggerRef.current.getBoundingClientRect().width
		: undefined;

	return <DropdownStyled {...props} $triggerWidth={trriggerWidth} />;
};

const mobileAnimationIn = keyframes`
    from {
        opacity: 0;
        transform: translateY(40px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
`;
const mobileAnimationOut = keyframes`
    from {
        opacity: 1;
        transform: translateY(0);
    }
    to {
        opacity: 0;
        transform: translateY(40px); 
    }
`;
const desktopAnimationIn = keyframes`
    from {
        opacity: 0;
        transform: translateY(-5px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
`;
const desktopAnimationOut = keyframes`
    from {
        opacity: 1;
        transform: translateY(0);
    }
    to {
        opacity: 0;
        transform: translateY(-5px); 
    }
`;
const DropdownStyled = styled(Popover)`
	border-top-left-radius: var(--r-l);
	border-top-right-radius: var(--r-l);
	padding-block: 0.5rem;
	background-color: var(--white);
	box-shadow: 0px 4px 30px 0px rgba(0, 0, 0, 0.05);
	height: fit-content;
	overflow-y: auto;
	width: 100%;

	/* Override Popover styles which are calculated based on the trigger's position */
	${({ theme }) => theme.mediaQueries.mobileAndTablet} {
		bottom: 0 !important;
		left: 0 !important;
		top: unset !important;
		max-height: 85vh !important;

		&[data-entering] {
			animation: ${mobileAnimationIn} 0.25s ease-in-out;
		}
		&[data-exiting] {
			animation: ${mobileAnimationOut} 0.25s ease-in-out;
		}
	}

	${({ theme }) => theme.mediaQueries.desktopAndUp} {
		padding-block: 0.25rem;
		border-radius: var(--r-xs);
		max-height: 14rem !important;
		max-width: ${({ $triggerWidth }) =>
			$triggerWidth ? `${$triggerWidth}px` : "var(--trigger-width)"};

		&[data-entering] {
			animation: ${desktopAnimationIn} 0.25s ease-in-out;
		}
		&[data-exiting] {
			animation: ${desktopAnimationOut} 0.25s ease-in-out;
		}
	}
`;

export default Dropdown;
