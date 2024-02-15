import { useMemo, useState } from 'react';
import Text from 'shared/src/components/Text';
import { Input as AriaInput, ListBox, ListBoxItem, SearchField } from 'react-aria-components';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';
import { useIntl, FormattedMessage } from 'react-intl';
import useDebounce from 'shared/src/hooks/useDebounce.hook';
import Link from 'shared/src/components/Link';
import useServicesQuery from 'shared/src/queries/service/useServicesQuery.hook';
import IconButton from 'shared/src/components/IconButton';
import { useParams } from 'react-router-dom';
import useUpdateServiceMutation from '@queries/service/useUpdateServiceMutation.hook';
import useUserQuery from 'shared/src/queries/user/useUserQuery.hook';
import { USER_ROLES } from 'shared/src/utils/constants';
import { shimmering } from 'shared/src/styles/animations';

const AvailableServices = () => {
    const { establishmentId } = useParams();
    const intl = useIntl();
    const user = useUserQuery();
    const isProvider = user.data?.roles?.includes(USER_ROLES.PROVIDER);
    const { data: services, isLoading } = useServicesQuery({
        pagination: false,
    });
    const [searchQuery, setSearchQuery] = useState('');
    const debouncedSearchQuery = useDebounce(searchQuery);
    const updateService = useUpdateServiceMutation();
    const items = useMemo(() => {
        let items = services?.filter((service) => {
            return !service.establishment.some(
                (establishment) => establishment.id === establishmentId,
            );
        });

        if (!items) return [];

        if (debouncedSearchQuery.length > 1) {
            items = items.filter((service) => {
                return service.name.toLowerCase().includes(debouncedSearchQuery.toLowerCase());
                // || service.category.name.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
            });
        }

        return items;
    }, [services, debouncedSearchQuery]);

    const handleAddService = (service) => {
        const establishments = service.establishment.map((e) => e.id);
        console.log([...establishments, establishmentId]);
        updateService.mutate({
            serviceId: service.id,
            service: {
                establishment: [...establishments, establishmentId],
            },
        });
    };

    const renderEmptyState = () => {
        if (isLoading || user.isLoading) return <Loader />;
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
                    <FormattedMessage defaultMessage="Il semble que vous n'ayez aucune prestation disponible" />
                </Text>
                <Text color="--neutral500">
                    <FormattedMessage defaultMessage="C'est l'occasion idéale pour élargir votre offre de prestations !" />
                </Text>
                <Text color="--neutral500">
                    <FormattedMessage
                        defaultMessage="🌟 Ajoutez une bnouvelle prestation et enrichissez votre catalogue ! <link>Cliquez ici pour commencer.</link>"
                        values={{
                            link: (chunks) => <ServicesLink to="/services">{chunks}</ServicesLink>,
                        }}
                    />
                </Text>
            </EmptyStateWrapper>
        );
    };

    if (!isProvider) return null;

    return (
        <AvailableServicesWrapper>
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
                        <AddButton
                            isLoading={updateService.isLoading}
                            onPress={() => handleAddService(item)}
                            icon={<AddIcon icon={icon({ name: 'add', style: 'solid' })} />}
                        />
                    </ListItem>
                )}
            </List>
        </AvailableServicesWrapper>
    );
};

const AvailableServicesWrapper = styled.div`
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
    background-color: var(--white);
    min-width: 0;
    box-shadow: 0px 4px 16px 0px rgba(0, 0, 0, 0.05);

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
    flex-grow: 1;
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
const ServicesLink = styled(Link)`
    color: var(--primary500);
    font-weight: var(--fw-semibold);
    cursor: pointer;
`;
const Loader = styled.div`
    border-radius: var(--r-m);
    background-color: var(--neutral50);
    height: 100%;
    width: 100%;
    ${shimmering}
`;
export default AvailableServices;
