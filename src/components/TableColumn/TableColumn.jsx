import PropTypes from 'prop-types';
import { Column as AriaColumn } from 'react-aria-components';
import styled from 'styled-components';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ascendingIcon = icon({ name: 'sort-up', style: 'solid' });
const descendingIcon = icon({ name: 'sort-down', style: 'solid' });

const sortIconMatch = {
    ascending: ascendingIcon,
    descending: descendingIcon,
};

const TableColumn = ({ children, ...props }) => {
    return (
        <Column {...props}>
            {({ allowsSorting, sortDirection }) => (
                <>
                    {children}
                    {allowsSorting && (
                        <span aria-hidden="true" className="sort-indicator">
                            <SortIcon icon={sortIconMatch[sortDirection]} />
                        </span>
                    )}
                </>
            )}
        </Column>
    );
};

const Column = styled(AriaColumn)`
    text-align: left;
    padding: 1rem;
`;
const SortIcon = styled(FontAwesomeIcon)`
    width: 1rem;
    height: 1rem;
`;

TableColumn.propTypes = {};

export default TableColumn;
