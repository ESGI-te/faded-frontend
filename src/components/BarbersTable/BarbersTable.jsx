import Checkbox from '@components/Checkbox';
import Cluster from '@components/Cluster';
import IconButton from '@components/IconButton';
import { useState } from 'react';
import {
    Cell as AriaCell,
    Column,
    Row,
    Table as AriaTable,
    TableBody,
    TableHeader,
    DialogTrigger,
} from 'react-aria-components';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DeleteBarberModal from '@components/DeleteBarberModal';
import EditBarberModal from '@components/EditBarberModal';
import useDeleteBarberMutation from '@queries/barber/useDeleteBarberMutation.hook';

const BarbersTable = ({ barbers }) => {
    const [selectedItems, setSelectedItems] = useState([]);
    const items = barbers.map((barber) => ({
        id: barber.id,
        lastName: barber.lastName,
        firstName: barber.firstName,
    }));

    const deleteBarber = useDeleteBarberMutation();
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
        <Table onSelectionChange={handleSelection} aria-label="Users" selectionMode="multiple">
            <TableHeader>
                <HeaderSelectionColumn>
                    <Cluster align="center" gap="0.5rem">
                        <Checkbox slot="selection" />
                        {selectedItems.length > 0 && (
                            <DialogTrigger>
                                <DeleteButton
                                    variant="ghost"
                                    icon={
                                        <TrashIcon icon={icon({ name: 'trash', style: 'solid' })} />
                                    }
                                />
                                <DeleteBarberModal
                                    onDelete={handleDelete}
                                    isLoading={isdeleteLoading}
                                />
                            </DialogTrigger>
                        )}
                    </Cluster>
                </HeaderSelectionColumn>
                <HeaderColumn isRowHeader>
                    <FormattedMessage defaultMessage="Nom" />
                </HeaderColumn>
                <HeaderColumn>
                    <FormattedMessage defaultMessage="Prénom" />
                </HeaderColumn>
                <HeaderColumn />
            </TableHeader>
            <TableBody items={items} renderEmptyState={() => 'No results found.'}>
                {(barber) => (
                    <BodyRow id={barber.id}>
                        <Cell>
                            <Checkbox slot="selection" />
                        </Cell>
                        <Cell>{barber.lastName}</Cell>
                        <Cell>{barber.firstName}</Cell>
                        <ActionCell>
                            <DialogTrigger>
                                <EditButton
                                    variant="ghost"
                                    icon={<Icon icon={icon({ name: 'pen', style: 'solid' })} />}
                                />
                                <EditBarberModal barber={barbers.find((b) => b.id === barber.id)} />
                            </DialogTrigger>
                        </ActionCell>
                    </BodyRow>
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
const HeaderColumn = styled(Column)`
    text-align: left;
    padding: 1rem;
`;
const HeaderSelectionColumn = styled(HeaderColumn)`
    width: 5rem;
`;
const BodyRow = styled(Row)`
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

export default BarbersTable;
