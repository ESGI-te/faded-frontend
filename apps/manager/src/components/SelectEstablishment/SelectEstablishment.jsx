import { useMemo, useState } from 'react';
import Text from 'shared/src/components/Text';
import useEstablishmentsQuery from 'shared/src/queries/establishment/useEstablishmentsQuery.hook';
import {
    Input as AriaInput,
    DialogTrigger,
    ListBox,
    ListBoxItem,
    SearchField,
} from 'react-aria-components';
import styled from 'styled-components';
import { USER_ROLES } from 'shared/src/utils/constants';
import useUserQuery from 'shared/src/queries/user/useUserQuery.hook';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';
import { useIntl, FormattedMessage } from 'react-intl';
import useDebounce from 'shared/src/hooks/useDebounce.hook';
import { useParams, useNavigate } from 'react-router-dom';
import EstablishmentStatusBadge from '@components/EstablishmentStatusBadge';
import Button from 'shared/src/components/Button';
import CreateEstablishmentModal from '@components/CreateEstablishmentModal';
import placeholderIllustration from 'shared/src/assets/images/placeholder-img.png';

const SelectEstablishment = ({ onClose }) => {
    const intl = useIntl();
    const { data: user } = useUserQuery();
    const { data: establishments } = useEstablishmentsQuery({ pagination: false });
    const { establishmentId } = useParams();
    const isBarber = user && user.roles.includes(USER_ROLES.BARBER);
    const [searchQuery, setSearchQuery] = useState('');
    const debouncedSearchQuery = useDebounce(searchQuery);
    const navigate = useNavigate();

    const items = useMemo(() => {
        let items = establishments;

        if (!items) return [];

        if (!establishmentId && debouncedSearchQuery < 1) return [];

        if (debouncedSearchQuery.length > 1) {
            items = items.filter((e) => e.name.toLowerCase().includes(searchQuery.toLowerCase()));
        }

        if (establishmentId && debouncedSearchQuery.length < 1) {
            items = establishments?.filter((e) => e.id === establishmentId);
        }

        return items.map((e) => ({
            id: e.id,
            name: e.name,
            image: e.image || placeholderIllustration,
            status: e.status,
        }));
    }, [establishments, debouncedSearchQuery]);

    const handleSelectEstablishment = ({ currentKey }) => {
        if (isBarber) return;
        const establishmentFull = establishments?.find(
            (establishment) => establishment.id === currentKey,
        );
        if (!establishmentFull) return;
        navigate(`/${currentKey}`);
        onClose();
    };

    const renderEmptyState = () => (
        <EmptyStateText>
            {debouncedSearchQuery.length < 1 && items.length <= 1 && establishments?.length > 0 ? (
                <FormattedMessage
                    defaultMessage="{nbEstablishments, plural, 
                    =0 {Aucun établissement}
                    =1 {Un établissement}
                    other {# établissements}
                }"
                    values={{ nbEstablishments: establishments?.length }}
                />
            ) : (
                <FormattedMessage defaultMessage="Aucun résultat" />
            )}
        </EmptyStateText>
    );

    return (
        <SelectEstablishmentWrapper>
            <InputWrapper
                onChange={setSearchQuery}
                placeholder={intl.formatMessage({ defaultMessage: 'Chercher un établissement...' })}
                autoFocus
            >
                <SearchIcon icon={icon({ name: 'magnifying-glass', style: 'solid' })} />
                <Input />
                <Escape>Esc</Escape>
            </InputWrapper>
            <List
                selectedKeys={[establishmentId]}
                onSelectionChange={handleSelectEstablishment}
                selectionMode="single"
                items={items}
                renderEmptyState={renderEmptyState}
            >
                {(item) => (
                    <EstablishmentSelectListItem id={item.id}>
                        <EstablishmentSelectListItemInnerWrapper>
                            <EstablishmentImage src={item.image} />
                            <EstablishmentListItemName slot="label">
                                {item.name}
                            </EstablishmentListItemName>
                            <EstablishmentStatusBadge status={item.status} />
                            <SelectedIcon icon={icon({ name: 'check', style: 'solid' })} />
                        </EstablishmentSelectListItemInnerWrapper>
                    </EstablishmentSelectListItem>
                )}
            </List>
            {debouncedSearchQuery.length < 1 && items.length <= 1 && (
                <DialogTrigger>
                    <CreateEstablishmentButton
                        variant="ghost"
                        startIcon={
                            <CreateIcon icon={icon({ name: 'circle-plus', style: 'solid' })} />
                        }
                    >
                        <FormattedMessage defaultMessage="Ajouter un établissement" />
                    </CreateEstablishmentButton>
                    <CreateEstablishmentModal />
                </DialogTrigger>
            )}
        </SelectEstablishmentWrapper>
    );
};

const SelectEstablishmentWrapper = styled.div`
    /* padding: 1rem; */
`;
const SelectedIcon = styled(FontAwesomeIcon)`
    display: none;
    font-size: 1rem;
    color: var(--black);
`;
const EstablishmentSelectListItem = styled(ListBoxItem)`
    border-radius: var(--r-s);
    padding: 0.5rem;
    cursor: pointer;
    min-width: 0;

    &[data-selected] {
        background-color: var(--neutral50);

        [slot='label'] {
            color: var(--black);
            font-weight: var(--fw-semibold);
        }

        ${SelectedIcon} {
            display: block;
        }
    }

    &:hover:not([data-selected]) {
        background-color: var(--neutral50);
    }

    &[data-focused] {
        outline: none;
    }

    &[data-focus-visible] {
        outline: 2px solid var(--primary500);
    }
`;
const EstablishmentSelectListItemInnerWrapper = styled.div`
    display: flex;
    align-items: center;
    column-gap: 0.5rem;
    min-width: 0;
`;
const EstablishmentListItemName = styled(Text)`
    flex-grow: 1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    min-width: 0;
`;
const EstablishmentImage = styled.img`
    width: 1.5rem;
    height: 1.5rem;
    border-radius: var(--r-full);
    flex-basis: 1.5rem;
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

    &[data-focused] {
        outline: none;
    }
`;
const List = styled(ListBox)`
    list-style: none;
    display: flex;
    flex-direction: column;
    row-gap: 0.25rem;
    flex: 1;
    min-height: 0;
    overflow-y: auto;
    padding: 0.5rem;
`;
const SearchIcon = styled(FontAwesomeIcon)`
    font-size: 1rem;
    color: var(--neutral500);
`;
const Escape = styled.div`
    padding: 0.25rem;
    border-radius: var(--r-s);
    border: 1px solid var(--neutral200);
    color: var(--neutral500);
    font-size: var(--fs-body-s);
    line-height: var(--lh-body-s);
`;
const EmptyStateText = styled(Text)`
    padding: 0.5rem;
`;
const CreateEstablishmentButton = styled(Button)`
    display: flex;
    align-items: center;
    justify-content: start;
    column-gap: 0.75rem;
    padding: 0.5rem;
    border-radius: var(--r-s);
    margin: 0.5rem;
    width: calc(100% - 1rem);
    color: var(--black);
    font-weight: var(--fw-normal);

    &:hover {
        background-color: var(--neutral50);
        text-decoration: none;
    }
`;
const CreateIcon = styled(FontAwesomeIcon)`
    width: 1rem;
    height: 1rem;
    color: var(--primary);
`;

export default SelectEstablishment;
