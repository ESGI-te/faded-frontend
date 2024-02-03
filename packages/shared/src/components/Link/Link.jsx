import { NavLink } from "react-router-dom";
import { Link as AriaLink } from "react-aria-components";
import styled from "styled-components";

const Link = (props) => {
	return <StyledLink as={NavLink} {...props} />;
};

const StyledLink = styled(AriaLink)`
	text-decoration: none;
	color: var(--typo);
	cursor: pointer;

	&:hover {
		text-decoration: underline;
	}
`;

export default Link;
