import PropTypes from "prop-types";
import {
	TableHeader as AriaTableHeader,
	Collection,
	useTableOptions,
} from "react-aria-components";
import styled from "styled-components";
import TableColumn from "shared/src/components/TableColumn";
import Cluster from "shared/src/components/Cluster";
import Checkbox from "shared/src/components/Checkbox";

const TableHeader = ({ columns, children, actions }) => {
	let { selectionBehavior, selectionMode } = useTableOptions();

	return (
		<AriaTableHeader>
			{selectionBehavior === "toggle" && (
				<TableSelectionColumn>
					{selectionMode === "multiple" && (
						<Cluster align="center" gap="0.5rem">
							<Checkbox slot="selection" />
							{actions}
						</Cluster>
					)}
				</TableSelectionColumn>
			)}
			<Collection items={columns}>{children}</Collection>
		</AriaTableHeader>
	);
};

const TableSelectionColumn = styled(TableColumn)`
	width: 5rem;
`;

TableHeader.propTypes = {};

export default TableHeader;
