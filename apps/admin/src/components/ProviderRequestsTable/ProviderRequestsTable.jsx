import { useState } from 'react';
import {
    Cell as AriaCell,
    Table as AriaTable,
    TableBody,
} from 'react-aria-components';
import { useIntl } from 'react-intl';
import styled from 'styled-components';
import TableColumn from 'shared/src/components/TableColumn';
import TableHeader from 'shared/src/components/TableHeader';
import TableRow from 'shared/src/components/TableRow';
import { PROVIDER_REQUEST_STATUS } from '@utils/constants';
import dayjs from 'dayjs';
import ProviderRequestsTableMenu from './ProviderRequestsTableMenu';

const BarbersTable = ({ items }) => {
    const intl = useIntl();
    // const items = requests.map((request) => ({
    //     id: request.id,
    //     lastName: request.lastName,
    //     firstName: request.firstName,
    // }));
    const columns = [
        {
            key: 'companyName',
            isRowHeader: true,
            allowsSorting: true,
            name: intl.formatMessage({ defaultMessage: 'Prestataire' }),
        },
        {
            key: 'professionalEmail',
            allowsSorting: true,
            name: intl.formatMessage({ defaultMessage: 'Email' }),
        },
        {
            key: 'createdAt',
            allowsSorting: true,
            name: intl.formatMessage({ defaultMessage: 'Date' }),
        },
        {
            key: 'actions',
            name: null,
        },
    ];
    let [sortDescriptor, setSortDescriptor] = useState({
        column: 'lastName',
        direction: 'ascending',
    });

    return (
        <Table
            sortDescriptor={setSortDescriptor}
            onSortChange={(data) => {
                console.log(data);
            }}
            aria-label="Provider requests"
        >
            <TableHeader
                columns={columns}
            >
                {({ key, ...column }) => (
                    <TableColumn id={key} {...column}>
                        {column.name}
                    </TableColumn>
                )}
            </TableHeader>
            <TableBody items={items} renderEmptyState={() => 'No results found.'}>
                {(request) => (
                    <TableRow id={request.id}>
                        <Cell>{request.companyName}</Cell>
                        <Cell>{request.professionalEmail}</Cell>
                        <Cell>{dayjs(request.createdAt).format('DD/MM/YYYY HH:mm')}</Cell>
                        <ActionCell>
                            {request.status === PROVIDER_REQUEST_STATUS.PENDING && (
                                <ProviderRequestsTableMenu request={request} />
                            )}
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

export default BarbersTable;
