import { createGlobalStyle } from 'styled-components';
import { MEDIA_QUERIES } from '@/utils/responsive';

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
		 /* Radii */
        --r-none: 0;
        --r-xxs: 0.125rem;
        --r-xs: 0.25rem;
        --r-s: 0.5rem;
        --r-m: 0.75rem;
        --r-l: 1rem;
        --r-xl: 2rem;
        --r-full: 9999px;

		/* Font Weights */
		--fw-normal: 400;
		--fw-semibold: 600;
		--fw-bold: 700;

		/* Font Sizes */
		--fs-heading-xl: 2.5rem;
        --fs-heading-l: 2rem;
        --fs-heading-m: 1.5rem;
        --fs-heading-s: 1.25rem;
        --fs-body-l: 1rem;
        --fs-body-m: 0.875rem;
        --fs-body-s: 0.75rem;

		/* Line Heights */
		--lh-heading-xl: 3rem;
        --lh-heading-l: 2.5rem;
        --lh-heading-m: 2rem;
        --lh-heading-s: 1.75rem;
        --lh-body-l: 1.5rem;
        --lh-body-m: 1.25rem;
        --lh-body-s: 1rem;

		/* Fixed container width */
        --container-width: 1264px;
        --container-padding: 2rem;
        --container-padding-mobile: 1rem;

		/* Colors */
		--primary: #000000; 

		--secondary: #564147;
		--secondary-light: #BDA5AB;

		--white: #ffffff;
		
		--black: #141414;

		--neutral50: #F9F7FA;
        --neutral100: #F0EDF2;
        --neutral200: #D6D2D9;
        --neutral300: #BCB8BF;
        --neutral400: #A29DA6;
        --neutral500: #88848C;
        --neutral600: #6F6B73;
        --neutral700: #565259;
        --neutral: var(--neutral500);

		--success: #254D4C;
		--success-dark: #002120;
    }

`;
