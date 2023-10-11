import { createGlobalStyle } from "styled-components";
import { MEDIA_QUERIES } from "@/utils/responsive";

export const mediaQueries = {
	mediaQueries: {
		mobile: MEDIA_QUERIES.MOBILE,
		tabletAndUp: MEDIA_QUERIES.TABLET_AND_UP,
		desktopAndUp: MEDIA_QUERIES.DESKTOP_AND_UP,
		desktopLargeAndUp: MEDIA_QUERIES.DESKTOP_LARGE_AND_UP,
	},
};

export const Theme = createGlobalStyle`
    :root {
        /* Add variables here */
    }
`;
