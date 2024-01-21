import { css, keyframes } from "styled-components";

const shimmer = keyframes`
    0%{
        background-position: -468px 0
    }
    100%{
        background-position: 468px 0
    }
`;
export const shimmering = css`
	background: var(--neutral50);
	background-image: linear-gradient(
		to right,
		var(--neutral50) 0%,
		#edeef1 20%,
		var(--neutral50) 40%,
		var(--neutral50) 100%
	);
	background-repeat: no-repeat;
	background-size: 800px;
	animation-duration: 1.8s;
	animation-fill-mode: forwards;
	animation-iteration-count: infinite;
	animation-name: ${shimmer};
	animation-timing-function: linear;
`;
