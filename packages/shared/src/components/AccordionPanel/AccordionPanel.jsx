import PropTypes from "prop-types";
import styled from "styled-components";
import { useAccordionItem } from "../AccordionItem/useAccordionItem.hook";
import { AnimatePresence, motion } from "framer-motion";

const AccordionPanel = (props) => {
	const { isExpanded } = useAccordionItem();

	return (
		<AnimatePresence initial={false}>
			<Panel
				key="content"
				initial={false}
				animate={isExpanded ? "open" : "collapsed"}
				variants={{
					open: {
						opacity: 1,
						height: "auto",
						display: "block",
						overflow: "hidden",
						transitionEnd: { overflow: "visible" },
					},
					collapsed: {
						opacity: 0,
						height: 0,
						overflow: "hidden",
						transitionEnd: { display: "none" },
					},
				}}
				transition={{ duration: 0.225, ease: [0.04, 0.62, 0.23, 0.98] }}
				{...props}
			/>
		</AnimatePresence>
	);
};

const Panel = styled(motion.section)``;

AccordionPanel.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string,
};

export default AccordionPanel;
