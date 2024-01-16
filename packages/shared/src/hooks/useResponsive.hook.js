import { BREAKPOINTS } from "../utils/responsive";
import { useEffect, useState } from "react";

const useResponsive = () => {
	const [isMobile, setIsMobile] = useState(false);
	const [isTabletAndUp, setIsTabletAndUp] = useState(false);
	const [isDesktopAndUp, setIsDesktopAndUp] = useState(false);
	const [isDesktopLargeAndUp, setIsDesktopLargeAndUp] = useState(false);

	const handleResize = () => {
		const windowWidth = window.innerWidth;

		setIsMobile(windowWidth < BREAKPOINTS.TABLET_MIN);
		setIsTabletAndUp(windowWidth >= BREAKPOINTS.TABLET_MIN);
		setIsDesktopAndUp(windowWidth >= BREAKPOINTS.DESKTOP_MIN);
		setIsDesktopLargeAndUp(windowWidth >= BREAKPOINTS.DESKTOP_LARGE_MIN);
	};

	useEffect(() => {
		handleResize();
		window.addEventListener("resize", handleResize);

		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	return {
		isMobile,
		isTabletAndUp,
		isDesktopAndUp,
		isDesktopLargeAndUp,
	};
};

export default useResponsive;
