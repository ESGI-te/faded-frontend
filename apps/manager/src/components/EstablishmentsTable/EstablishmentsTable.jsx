import { useState } from 'react';
import { Cell as AriaCell, Table as AriaTable, TableBody } from 'react-aria-components';
import { useIntl } from 'react-intl';
import styled from 'styled-components';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TableColumn from 'shared/src/components/TableColumn';
import TableHeader from 'shared/src/components/TableHeader';
import TableRow from 'shared/src/components/TableRow';
import Link from 'shared/src/components/Link';

const EstablishmentsTable = ({ establishments }) => {
    const intl = useIntl();
    const items = establishments.map((establishment) => ({
        id: establishment.id,
        name: establishment.name,
    }));
    const columns = [
        {
            key: 'name',
            isRowHeader: true,
            allowsSorting: true,
            name: intl.formatMessage({ defaultMessage: 'Nom' }),
        },
        {
            key: 'actions',
            name: null,
        },
    ];
    let [sortDescriptor, setSortDescriptor] = useState({
        column: 'name',
        direction: 'ascending',
    });

    return (
        <Table
            sortDescriptor={setSortDescriptor}
            onSortChange={(data) => {
                console.log(data);
            }}
            aria-label="Establishments"
        >
            <TableHeader columns={columns}>
                {({ key, ...column }) => (
                    <TableColumn id={key} {...column}>
                        {column.name}
                    </TableColumn>
                )}
            </TableHeader>
            <TableBody items={items} renderEmptyState={() => 'No results found.'}>
                {(establishment) => (
                    <TableRow id={establishment.id}>
                        <Cell>{establishment.name}</Cell>
                        {/* <Cell>{establishment.firstName}</Cell> */}
                        <ActionCell>
                            <EditButtonLink to={`/${establishment.id}/settings`}>
                                <Icon icon={icon({ name: 'pen', style: 'solid' })} />
                            </EditButtonLink>
                        </ActionCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
};

const Table = styled(AriaTable)`
    width: 100%;
    border-radius: var(--r-l);
    background-color: var(--white);
    box-shadow: var(--shadow-xs);
    padding: 1rem;
    border-spacing: 0 0.5rem;
    border-collapse: collapse;
`;
const Cell = styled(AriaCell)`
    padding: 0.75rem 1rem;
`;
const ActionCell = styled(Cell)`
    display: flex;
    justify-content: flex-end;
    align-items: center;
`;
const Icon = styled(FontAwesomeIcon)`
    width: 1rem;
    height: 1rem;
    color: var(--neutral500);
`;
const EditButtonLink = styled(Link)`
    &[data-hovered] {
        & > ${Icon} {
            color: var(--neutral700);
        }
    }
`;

export default EstablishmentsTable;
