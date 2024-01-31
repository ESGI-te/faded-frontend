import IconButton from 'shared/src/components/IconButton';
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
// import useDeleteBarberMutation from '@queries/establishment/useDeleteBarberMutation.hook';
import TableColumn from 'shared/src/components/TableColumn';
import TableHeader from 'shared/src/components/TableHeader';
import TableRow from 'shared/src/components/TableRow';

const EstablishmentsTable = ({ establishments }) => {
    const intl = useIntl();
    const items = establishments.map((establishment) => ({
        id: establishment.id,
        name: establishment.name,
        // firstName: establishment.firstName,
    }));
    const columns = [
        {
            key: 'name',
            isRowHeader: true,
            allowsSorting: true,
            name: intl.formatMessage({ defaultMessage: 'Nom' }),
        },
        // {
        //     key: 'firstName',
        //     allowsSorting: true,
        //     name: intl.formatMessage({ defaultMessage: 'Prénom' }),
        // },
        {
            key: 'actions',
            name: null,
        },
    ];
    let [sortDescriptor, setSortDescriptor] = useState({
        column: 'name',
        direction: 'ascending',
    });
    // const deleteBarber = useDeleteBarberMutation();
    const [isdeleteLoading, setIsDeleteLoading] = useState(false);

    // const handleDelete = async (onCloseModal) => {
    //     setIsDeleteLoading(true);
    //     const promises = [];
    //     selectedItems.forEach((id) => {
    //         const promise = deleteBarber.mutateAsync(id);
    //         promises.push(promise);
    //     });
    //     await Promise.all(promises);
    //     setIsDeleteLoading(false);
    //     onCloseModal();
    // };

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
                            <EditButton
                                variant="ghost"
                                icon={<Icon icon={icon({ name: 'pen', style: 'solid' })} />}
                            />
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
const EditButton = styled(TableIconButton)`
    &[data-hovered] {
        & > ${Icon} {
            color: var(--neutral700);
        }
    }
`;

export default EstablishmentsTable;
