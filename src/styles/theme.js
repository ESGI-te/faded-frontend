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
        --primary50:  #F9F7F7;
        --primary100: #F4EFF1;
        --primary200: #E9E2E3;
        --primary300: #D8C9CD;
        --primary400: #BDA5AB;
        --primary500: #A88B93;

		--secondary50: #FFF0F7;
        --secondary100: #FFE3F1;
        --secondary200: #FFC9E5;
        --secondary300: #FF9CCE;
        --secondary400: #FF5FAC;
        --secondary500: #FF318A;
        
        --alert50: #FFE9ED;
        --alert100: #FFD4DB;
        --alert200: #FFA8B7;
        --alert300: #FF7D92;
        --alert400: #FF516E;
        --alert500: #FF264A;
        --alert600: #CC1E3B;
        --alert700: #99172C;

        --success50:  #F3FAF8;
        --success100: #D8EFEB;
        --success200: #B0DFD8;
        --success300: #81C7BF;
        --success400: #56ABA3;
        --success500: #3D8F89;

        --info-50: #F0F4FD;
        --info-100: #E5EBFA;
        --info-200: #CFDAF6;
        --info-300: #B2C1EF;
        --info-400: #92A0E7;
        --info-500: #7881DC;

        --warning-50: #fffcea;
        --warning-100: #fff5c5;
        --warning-200: #ffeb85;
        --warning-300: #ffda46;
        --warning-400: #ffc71b;
        --warning-500: #ffa500;

		--neutral50: #F9F7FA;
        --neutral100: #F0EDF2;
        --neutral200: #D6D2D9;
        --neutral300: #BCB8BF;
        --neutral400: #A29DA6;
        --neutral500: #88848C;
        --neutral600: #6F6B73;
        --neutral700: #565259;

        --primary: var(--primary400);
        --secondary: var(--primary100);
        --success: var(--success500);
        --info: var(--info500);
        --warning: var(--warning500);
        --neutral: var(--neutral500);
        --white: #ffffff;
		--black: #000000;
		--typo: #141414;
    }

`;
