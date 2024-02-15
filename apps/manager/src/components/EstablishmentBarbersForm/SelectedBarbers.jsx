import { useMemo, useState } from 'react';
import Text from 'shared/src/components/Text';
import {
    Input as AriaInput,
    DialogTrigger,
    ListBox,
    ListBoxItem,
    SearchField,
} from 'react-aria-components';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';
import { useIntl, FormattedMessage } from 'react-intl';
import useDebounce from 'shared/src/hooks/useDebounce.hook';
import useBarbersQuery from 'shared/src/queries/barber/useBarbersQuery.hook';
import IconButton from 'shared/src/components/IconButton';
import { useParams } from 'react-router-dom';
import useUpdateBarberMutation from '@queries/barber/useUpdateBarberMutation.hook';
import useUserQuery from 'shared/src/queries/user/useUserQuery.hook';
import { USER_ROLES } from 'shared/src/utils/constants';
import { shimmering } from 'shared/src/styles/animations';
import Cluster from 'shared/src/components/Cluster';
import EditBarberModal from '@components/EditBarberModal';

const SelectedBarbers = () => {
    const { data: user } = useUserQuery();
    const isProvider = user?.roles?.includes(USER_ROLES.PROVIDER);
    const { establishmentId } = useParams();
    const intl = useIntl();
    const { data: barbers, isLoading } = useBarbersQuery({
        pagination: false,
    });
    const [searchQuery, setSearchQuery] = useState('');
    const debouncedSearchQuery = useDebounce(searchQuery);
    const updateBarber = useUpdateBarberMutation();

    const items = useMemo(() => {
        let items = barbers?.filter((barber) => barber?.establishment?.id === establishmentId);

        if (!items) return [];

        if (debouncedSearchQuery.length > 1) {
            items = items.filter((e) => {
                const name = `${e.firstName} ${e.lastName}`;
                return name.toLowerCase().includes(debouncedSearchQuery.toLowerCase());
            });
        }

        return items.map((b) => ({
            id: b.id,
            name: `${b.firstName} ${b.lastName}`,
        }));
    }, [barbers, debouncedSearchQuery, establishmentId]);

    const handleRemoveBarber = (barberId) => {
        updateBarber.mutate({
            barberId,
            barber: {
                establishment: null,
            },
        });
    };

    const renderEmptyState = () => {
        if (isLoading) return <Loader />;

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
                    <FormattedMessage defaultMessage="Oups... Il semble que votre salon soit un peu trop silencieux !" />
                </Text>
                <Text color="--neutral500">
                    <FormattedMessage defaultMessage="Nous ne trouvons actuellement aucun coiffeur dans votre établissement. C'est l'opportunité parfaite pour commencer à former votre équipe idéale !" />
                </Text>
                <Text color="--neutral500">
                    <FormattedMessage defaultMessage="✨ Ajoutez votre première étoile : Commencez à ajouter des coiffeurs depuis la colonne de droite." />
                </Text>
            </EmptyStateWrapper>
        );
    };

    return (
        <SelectedBarbersWrapper>
            <InputWrapper
                onChange={setSearchQuery}
                placeholder={intl.formatMessage({ defaultMessage: 'Chercher un coiffeur...' })}
            >
                <SearchIcon icon={icon({ name: 'magnifying-glass', style: 'solid' })} />
                <Input />
            </InputWrapper>
            <List items={items} renderEmptyState={renderEmptyState}>
                {(item) => (
                    <ListItem id={item.id}>
                        <ListItemName slot="label">{item.name}</ListItemName>
                        {isProvider && (
                            <Cluster gap="0.5rem" align="center">
                                <DialogTrigger>
                                    <EditButton
                                        variant="ghost"
                                        icon={<Icon icon={icon({ name: 'pen', style: 'solid' })} />}
                                    />
                                    <EditBarberModal
                                        barber={barbers.find((b) => b.id === item.id)}
                                    />
                                </DialogTrigger>
                                <AddButton
                                    isLoading={updateBarber.isLoading}
                                    onPress={() => handleRemoveBarber(item.id)}
                                    icon={
                                        <AddIcon icon={icon({ name: 'minus', style: 'solid' })} />
                                    }
                                />
                            </Cluster>
                        )}
                    </ListItem>
                )}
            </List>
        </SelectedBarbersWrapper>
    );
};

const SelectedBarbersWrapper = styled.div`
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
const Loader = styled.div`
    border-radius: var(--r-m);
    background-color: var(--neutral50);
    height: 100%;
    width: 100%;
    ${shimmering}
`;
const Icon = styled(FontAwesomeIcon)`
    width: 1rem;
    height: 1rem;
    color: var(--neutral500);
`;
const EditButton = styled(IconButton)`
    border-radius: var(--r-full);
    padding: 0.5rem;

    &[data-hovered] {
        background-color: var(--neutral50);
    }
`;
export default SelectedBarbers;
