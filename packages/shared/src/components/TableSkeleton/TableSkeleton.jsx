import Stack from "shared/src/components/Stack";
import styled from "styled-components";
import { shimmering } from "shared/src/styles/animations";

const TableSkeleton = () => {
	return (
		<Stack gap="1rem">
			<Block height="30rem" />
			<Block height="2rem" width="12rem" />
		</Stack>
	);
};

const Block = styled.div`
	background-color: var(--neutral100);
	border-radius: var(--r-s);
	width: 100%;
	padding: 1rem;

	${({ height }) => height && `height: ${height};`}
	${({ width }) => width && `max-width: ${width};`}
    ${({ color }) => color && `background-color: var(${color});`}
    
    ${shimmering}
`;

export default TableSkeleton;
