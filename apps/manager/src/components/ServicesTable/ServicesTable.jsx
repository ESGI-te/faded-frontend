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
import useDeleteServiceMutation from 'shared/src/queries/service/useDeleteServiceMutation.hook';
import TableColumn from 'shared/src/components/TableColumn';
import TableHeader from 'shared/src/components/TableHeader';
import TableRow from 'shared/src/components/TableRow';
import useUserQuery from 'shared/src/queries/user/useUserQuery.hook';
import { USER_ROLES } from 'shared/src/utils/constants';
import EditServiceModal from './EditServiceModal';
import useUpdateServiceMutation from '@queries/service/useUpdateServiceMutation.hook';
import DeleteServiceModal from './DeleteServiceModal';

const ServicesTable = ({ items }) => {
    const intl = useIntl();
    const [selectedItems, setSelectedItems] = useState([]);
    const { data: user } = useUserQuery();
    const isProvider = user?.roles?.includes(USER_ROLES.PROVIDER);
    const columns = [
        {
            key: 'name',
            isRowHeader: true,
            allowsSorting: true,
            name: intl.formatMessage({ defaultMessage: 'Nom' }),
        },
        {
            key: 'category',
            allowsSorting: true,
            name: intl.formatMessage({ defaultMessage: 'Catégorie' }),
        },
        {
            key: 'duration',
            allowsSorting: true,
            name: intl.formatMessage({ defaultMessage: 'Durée' }),
        },
        {
            key: 'price',
            allowsSorting: true,
            name: intl.formatMessage({ defaultMessage: 'Prix' }),
        },
        {
            key: 'establishments',
            allowsSorting: true,
            name: intl.formatMessage({ defaultMessage: 'Établissements' }),
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
    const deleteService = useDeleteServiceMutation();
    const [isdeleteLoading, setIsDeleteLoading] = useState(false);
    const updateService = useUpdateServiceMutation();
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editedService, setEditedService] = useState(null);

    const handleUpdateService = (serviceId, service) => {
        updateService.mutate(
            { serviceId, service },
            {
                onSuccess: () => {
                    setIsEditModalOpen(false);
                    setEditedService(null);
                },
            },
        );
    };

    const handleDelete = async (onCloseModal) => {
        setIsDeleteLoading(true);
        const promises = [];
        selectedItems.forEach((id) => {
            const promise = deleteService.mutateAsync(id);
            promises.push(promise);
        });
        await Promise.all(promises);
        setIsDeleteLoading(false);
        setSelectedItems([]);
        onCloseModal();
    };

    const handleSelection = (selectedItems) => {
        const forwardedItems = selectedItems === 'all' ? items : [...selectedItems];
        setSelectedItems(forwardedItems);
    };

    const handleEdit = (service) => {
        setEditedService(service);
        setIsEditModalOpen(true);
    };

    return (
        <>
            <Table
                onSelectionChange={handleSelection}
                sortDescriptor={setSortDescriptor}
                onSortChange={(data) => {
                    console.log(data);
                }}
                aria-label="Services"
                selectionMode={isProvider ? 'multiple' : 'none'}
            >
                <TableHeader
                    actions={
                        selectedItems.length > 0 ? (
                            <DialogTrigger>
                                <DeleteButton
                                    variant="ghost"
                                    icon={
                                        <TrashIcon icon={icon({ name: 'trash', style: 'solid' })} />
                                    }
                                />
                                <DeleteServiceModal
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
                    {(service) => (
                        <TableRow id={service.id}>
                            <Cell>{service.name}</Cell>
                            <Cell>{service.category.name}</Cell>
                            <Cell>{service.duration}min</Cell>
                            <Cell>{service.price}€</Cell>
                            <Cell>{service.establishment.length}</Cell>
                            {isProvider && (
                                <ActionCell>
                                    <EditButton
                                        onPress={() => handleEdit(service)}
                                        variant="ghost"
                                        icon={<Icon icon={icon({ name: 'pen', style: 'solid' })} />}
                                    />
                                </ActionCell>
                            )}
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            <EditServiceModal
                isOpen={isEditModalOpen}
                onOpenChange={setIsEditModalOpen}
                onSubmit={handleUpdateService}
                isLoading={updateService.isLoading}
                service={editedService}
            />
        </>
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

export default ServicesTable;
