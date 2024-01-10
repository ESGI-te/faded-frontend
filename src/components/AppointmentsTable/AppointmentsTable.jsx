import IconButton from '@components/IconButton';
import { useState } from 'react';
import {
    Cell as AriaCell,
    Table as AriaTable,
    TableBody,
    DialogTrigger,
} from 'react-aria-components';
import { useIntl } from 'react-intl';
import styled from 'styled-components';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DeleteBarberModal from '@components/DeleteBarberModal';
import TableColumn from '@components/TableColumn';
import TableHeader from '@components/TableHeader';
import TableRow from '@components/TableRow';
import AppointmentStatusBadge from '@components/AppointmentStatusBadge';
import CompleteAppointmentModal from '@components/CompleteAppointmentModal';
import useUserQuery from '@queries/user/useUserQuery.hook';
import { USER_ROLES } from '@utils/constants';
import { useParams } from 'react-router-dom';

const AppointmentsTable = ({ items }) => {
    const { establishmentId } = useParams();
    const intl = useIntl();
    const [selectedItems, setSelectedItems] = useState([]);
    // const items = barbers.map((appointment) => ({
    //     id: appointment.id,
    //     lastName: appointment.lastName,
    //     firstName: appointment.firstName,
    // }));
    const { data: user } = useUserQuery();
    const isProvider = user?.roles.includes(USER_ROLES.PROVIDER) && !establishmentId;
    const baseColumns = [
        {
            key: 'name',
            isRowHeader: true,
            allowsSorting: true,
            name: intl.formatMessage({ defaultMessage: 'Nom' }),
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
    let [sortDescriptor, setSortDescriptor] = useState({
        column: 'lastName',
        direction: 'ascending',
    });
    const deleteBarber = () => {};
    const [isdeleteLoading, setIsDeleteLoading] = useState(false);

    const handleDelete = async (onCloseModal) => {
        setIsDeleteLoading(true);
        const promises = [];
        selectedItems.forEach((id) => {
            const promise = deleteBarber.mutateAsync(id);
            promises.push(promise);
        });
        await Promise.all(promises);
        setIsDeleteLoading(false);
        onCloseModal();
    };

    const handleSelection = (selectedItems) => {
        const forwardedItems = selectedItems === 'all' ? items : [...selectedItems];
        setSelectedItems(forwardedItems);
    };

    return (
        <Table
            onSelectionChange={handleSelection}
            sortDescriptor={setSortDescriptor}
            onSortChange={(data) => {
                console.log(data);
            }}
            aria-label="Users"
            selectionMode="multiple"
        >
            <TableHeader
                actions={
                    selectedItems.length > 0 ? (
                        <DialogTrigger>
                            <DeleteButton
                                variant="ghost"
                                icon={<TrashIcon icon={icon({ name: 'trash', style: 'solid' })} />}
                            />
                            <DeleteBarberModal
                                onDelete={handleDelete}
                                isLoading={isdeleteLoading}
                            />
                        </DialogTrigger>
                    ) : null
                }
                columns={columns}
            >
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
                        <Cell>
                            <AppointmentStatusBadge status={appointment.status} />
                        </Cell>
                        <ActionCell>
                            <DialogTrigger>
                                <CompleteAppointmentButton
                                    variant="ghost"
                                    icon={<Icon icon={icon({ name: 'qrcode', style: 'solid' })} />}
                                />
                                <CompleteAppointmentModal
                                    appointment={items.find((a) => a.id === appointment.id)}
                                />
                            </DialogTrigger>
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
const Icon = styled(FontAwesomeIcon)`
    width: 1rem;
    height: 1rem;
    color: var(--neutral500);
`;
const TrashIcon = styled(Icon)`
    width: 1rem;
    height: 1rem;
    color: var(--alert500);
`;
const TableIconButton = styled(IconButton)`
    padding: 0;
`;
const DeleteButton = styled(TableIconButton)`
    &[data-hovered] {
        & > ${TrashIcon} {
            color: var(--alert600);
        }
    }
`;
const CompleteAppointmentButton = styled(TableIconButton)`
    &[data-hovered] {
        & > ${Icon} {
            color: var(--neutral700);
        }
    }
`;

export default AppointmentsTable;