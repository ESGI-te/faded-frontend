import { useMemo, useState } from 'react';
import Text from 'shared/src/components/Text';
import { Input as AriaInput, ListBox, ListBoxItem, SearchField } from 'react-aria-components';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';
import { useIntl, FormattedMessage } from 'react-intl';
import useDebounce from 'shared/src/hooks/useDebounce.hook';
import useServicesQuery from 'shared/src/queries/service/useServicesQuery.hook';
import IconButton from 'shared/src/components/IconButton';
import { useParams } from 'react-router-dom';
import useUpdateServiceMutation from '@queries/service/useUpdateServiceMutation.hook';
import useUserQuery from 'shared/src/queries/user/useUserQuery.hook';
import { USER_ROLES } from 'shared/src/utils/constants';
import ServicesSkeleton from './ServicesSkeleton';

const SelectedServices = () => {
    const { data: user } = useUserQuery();
    const isProvider = user?.roles?.includes(USER_ROLES.PROVIDER);
    const { establishmentId } = useParams();
    const intl = useIntl();
    const { data: services, isLoading } = useServicesQuery({
        establishment: establishmentId,
        pagination: false,
    });
    const [searchQuery, setSearchQuery] = useState('');
    const debouncedSearchQuery = useDebounce(searchQuery);
    const updateService = useUpdateServiceMutation();

    const items = useMemo(() => {
        let items = services;

        if (!items) return [];

        if (debouncedSearchQuery.length > 1) {
            items = items.filter((service) => {
                return service.name.toLowerCase().includes(debouncedSearchQuery.toLowerCase());
                // || service.category.name.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
            });
        }

        return items;
    }, [services, debouncedSearchQuery, establishmentId]);

    const handleRemoveService = (service) => {
        const establishments = service.establishment.map((e) => e.id);
        updateService.mutate({
            serviceId: service.id,
            service: {
                establishment: establishments.filter((e) => e !== establishmentId),
            },
        });
    };

    const renderEmptyState = () => {
        if (debouncedSearchQuery.length > 0) {
            return (
                <EmptyStateText fontWeight="semibold">
                    <FormattedMessage defaultMessage="Aucun résultat" />
                </EmptyStateText>
            );
        }
        return (
            <EmptyStateWrapper>
                <Text fontWeight="semibold">
                    <FormattedMessage defaultMessage="Oups... Il semble que vous n'ayez aucune prestation !" />
                </Text>
                <Text color="--neutral500">
                    <FormattedMessage defaultMessage="C'est le moment parfait pour ajouter des prestations à votre établissement." />
                </Text>
                <Text color="--neutral500">
                    <FormattedMessage defaultMessage="✨ Ajoutez votre première prestation depuis la colonne de droite." />
                </Text>
            </EmptyStateWrapper>
        );
    };

    if (isLoading) return <ServicesSkeleton />;

    return (
        <SelectedServicesWrapper>
            <InputWrapper
                onChange={setSearchQuery}
                placeholder={intl.formatMessage({ defaultMessage: 'Chercher une prestation...' })}
            >
                <SearchIcon icon={icon({ name: 'magnifying-glass', style: 'solid' })} />
                <Input />
            </InputWrapper>
            <List items={items} renderEmptyState={renderEmptyState}>
                {(item) => (
                    <ListItem id={item.id}>
                        <ListItemName slot="label">{item.name}</ListItemName>
                        {isProvider && (
                            <AddButton
                                isLoading={updateService.isLoading}
                                onPress={() => handleRemoveService(item)}
                                icon={<AddIcon icon={icon({ name: 'minus', style: 'solid' })} />}
                            />
                        )}
                    </ListItem>
                )}
            </List>
        </SelectedServicesWrapper>
    );
};

const SelectedServicesWrapper = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 1rem;
    flex-grow: 1;
    min-height: 0;
`;
const ListItem = styled(ListBoxItem)`
    display: flex;
    align-items: center;
    column-gap: 1rem;
    border-radius: var(--r-m);
    padding: 0.75rem;
    background-color: var(--neutral50);
    min-width: 0;

    &[data-focused] {
        outline: none;
    }
`;
const ListItemName = styled(Text)`
    flex-grow: 1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    min-width: 0;
`;
const InputWrapper = styled(SearchField)`
    display: flex;
    align-items: center;
    column-gap: 0.5rem;
    width: 100%;
    padding-inline: 1rem;
    padding-block: 1rem;
    border-bottom: 1px solid var(--neutral100);
`;
const Input = styled(AriaInput)`
    flex-grow: 1;
    border: none;
    background: transparent;

    &[data-focused] {
        outline: none;
    }
`;
const List = styled(ListBox)`
    list-style: none;
    display: flex;
    flex-direction: column;
    row-gap: 0.75rem;
    flex: 1;
    min-height: 0;
    overflow-y: auto;
`;
const SearchIcon = styled(FontAwesomeIcon)`
    font-size: 1rem;
    color: var(--neutral500);
`;
const AddButton = styled(IconButton)`
    background-color: var(--primary);
    width: 1.5rem;
    height: 1.5rem;
    border-radius: var(--r-full);
`;
const AddIcon = styled(FontAwesomeIcon)`
    width: 1rem;
    height: 1rem;
    max-width: 1rem;
    color: var(--white);
`;
const EmptyStateWrapper = styled(Text)`
    padding: 1rem;
    border-radius: var(--r-m);
    background-color: var(--primary100);
    display: flex;
    flex-direction: column;
    row-gap: 0.25rem;
`;
const EmptyStateText = styled(Text)`
    padding: 1rem;
`;

export default SelectedServices;
