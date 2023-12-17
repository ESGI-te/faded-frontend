import Checkbox from '@components/Checkbox';
import PropTypes from 'prop-types';
import {
    useTableOptions,
    Row as AriaRow,
    Collection,
    Cell as AriaCell,
} from 'react-aria-components';
import styled from 'styled-components';

const TableRow = ({ id, columns, children, ...props }) => {
    let { selectionBehavior } = useTableOptions();

    return (
        <Row id={id} {...props}>
            {selectionBehavior === 'toggle' && (
                <Cell>
                    <Checkbox slot="selection" />
                </Cell>
            )}
            <Collection items={columns}>{children}</Collection>
        </Row>
    );
};

const Row = styled(AriaRow)`
    &:not(:last-child) {
        border-bottom: 1px solid var(--neutral100);
    }
    &[data-hovered] {
        background-color: var(--neutral50);
    }
    &[data-selected] {
        background-color: var(--primary100);
    }
    &[data-focused] {
        outline: 2px solid var(--primary500);
    }
`;
const Cell = styled(AriaCell)`
    padding: 0.75rem 1rem;
`;

TableRow.propTypes = {};

export default TableRow;
