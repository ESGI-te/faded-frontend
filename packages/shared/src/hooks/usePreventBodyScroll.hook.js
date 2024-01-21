import { useState, useEffect } from "react";

const usePreventBodyScroll = (prevent = false) => {
	const [prevOverflow, setPrevOverflow] = useState("");
	const [prevPosition, setPrevPosition] = useState("");

	useEffect(() => {
		if (prevent) {
			setPrevOverflow(document.body.style.overflow);
			setPrevPosition(document.body.style.position);
			document.body.style.overflow = "hidden";
			document.body.style.position = "fixed";
		} else {
			document.body.style.overflow = prevOverflow;
			document.body.style.position = prevPosition;
		}
		return () => {
			document.body.style.overflow = prevOverflow;
			document.body.style.position = prevPosition;
		};
	}, [prevent]);
};

export default usePreventBodyScroll;
