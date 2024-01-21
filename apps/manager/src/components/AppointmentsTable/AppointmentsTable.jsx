import { Cell as AriaCell, Table as AriaTable, TableBody } from 'react-aria-components';
import { useIntl } from 'react-intl';
import styled from 'styled-components';
import TableColumn from 'shared/src/components/TableColumn';
import TableHeader from 'shared/src/components/TableHeader';
import TableRow from 'shared/src/components/TableRow';
import AppointmentStatusBadge from '@components/AppointmentStatusBadge';
import useUserQuery from 'shared/src/queries/user/useUserQuery.hook';
import { APPOINTMENT_STATUS, USER_ROLES } from 'shared/src/utils/constants';
import { useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import AppointmentsTableMenu from './AppointmentsTableMenu';
import { useSelectedEstablishment } from '@contexts/SelectedEstablishmentProvider';

const AppointmentsTable = ({ items }) => {
    const { establishment } = useSelectedEstablishment();
    const intl = useIntl();
    const { data: user } = useUserQuery();
    const isProvider = user?.roles.includes(USER_ROLES.PROVIDER) && !establishment;
    const baseColumns = [
        {
            key: 'customer',
            isRowHeader: true,
            allowsSorting: true,
            name: intl.formatMessage({ defaultMessage: 'Client' }),
        },
        {
            key: 'barber',
            allowsSorting: true,
            name: intl.formatMessage({ defaultMessage: 'Coiffeur' }),
        },
        {
            key: 'establishment',
            allowsSorting: true,
            name: intl.formatMessage({ defaultMessage: 'Établissement' }),
        },
        {
            key: 'dateTime',
            allowsSorting: true,
            name: intl.formatMessage({ defaultMessage: 'Date' }),
        },
        {
            key: 'status',
            allowsSorting: true,
            name: intl.formatMessage({ defaultMessage: 'Statut' }),
        },
        {
            key: 'actions',
            name: null,
        },
    ];
    const columns = baseColumns.filter((column) => isProvider || column.key !== 'establishment');
    // let [sortDescriptor, setSortDescriptor] = useState({
    //     column: 'lastName',
    //     direction: 'ascending',
    // });

    return (
        <Table
            // sortDescriptor={setSortDescriptor}
            // onSortChange={(data) => {
            //     console.log(data);
            // }}
            aria-label="Appointments"
        >
            <TableHeader columns={columns}>
                {({ key, ...column }) => (
                    <TableColumn id={key} {...column}>
                        {column.name}
                    </TableColumn>
                )}
            </TableHeader>
            <TableBody items={items} renderEmptyState={() => 'No results found.'}>
                {(appointment) => (
                    <TableRow id={appointment.id}>
                        <Cell>
                            {appointment.user.firstName} {appointment.user.lastName}
                        </Cell>
                        <Cell>
                            {appointment.barber.firstName} {appointment.barber.lastName}
                        </Cell>
                        {isProvider && <Cell>{appointment.establishment.name}</Cell>}
                        <Cell>{dayjs(appointment.dateTime).format('DD/MM/YYYY HH:mm')}</Cell>
                        <Cell>
                            <AppointmentStatusBadge status={appointment.status} />
                        </Cell>
                        <ActionCell>
                            {appointment.status === APPOINTMENT_STATUS.PLANNED && (
                                <AppointmentsTableMenu appointment={appointment} />
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
    border-radius: var(--r-m);
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
    text-align: -webkit-center;
`;

export default AppointmentsTable;
