import { useMemo, useRef, useState } from 'react';
import Text from 'shared/src/components/Text';
import { useSelectedEstablishment } from '@contexts/SelectedEstablishmentProvider';
import useEstablishmentsQuery from 'shared/src/queries/establishment/useEstablishmentsQuery.hook';
import {
    Button as AriaButton,
    Input as AriaInput,
    ListBox,
    ListBoxItem,
    SearchField,
    Link,
} from 'react-aria-components';
import styled from 'styled-components';
import { USER_ROLES } from 'shared/src/utils/constants';
import useUserQuery from 'shared/src/queries/user/useUserQuery.hook';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';
import { useIntl, FormattedMessage } from 'react-intl';
import useDebounce from 'shared/src/hooks/useDebounce.hook';
import Button from 'shared/src/components/Button';

const CreateEstablishmentButton = () => (
    <CreateEstablishmentLink to="/establishment/create">
        <CreateIcon icon={icon({ name: 'circle-plus', style: 'solid' })} />
        <FormattedMessage defaultMessage="Ajouter un établissement" />
    </CreateEstablishmentLink>
);

const SelectEstablishment = ({ onClose }) => {
    const intl = useIntl();
    const { data: user } = useUserQuery();
    const { data: establishments } = useEstablishmentsQuery();
    const { establishment, onSelectEstablishment } = useSelectedEstablishment();
    const isBarber = user && user.roles.includes(USER_ROLES.BARBER);
    const [searchQuery, setSearchQuery] = useState('');
    const debouncedSearchQuery = useDebounce(searchQuery);

    const items = useMemo(() => {
        let items = establishments?.data;

        if (!items) return [];

        if (!establishment && debouncedSearchQuery < 1) return [];

        if (debouncedSearchQuery.length > 1) {
            items = items.filter((e) => e.name.toLowerCase().includes(searchQuery.toLowerCase()));
        }

        if (establishment && debouncedSearchQuery.length < 1) {
            items = establishments.data.filter((e) => e.id === establishment.id);
        }

        return items.map((e) => ({
            id: e.id,
            name: e.name,
            image: 'https://cdn1.treatwell.net/images/view/v2.i3867704.w720.h480.xB88E4050/',
        }));
    }, [establishments, debouncedSearchQuery]);

    const handleSelectEstablishment = ({ currentKey }) => {
        if (isBarber) return;
        const establishmentFull = establishments.data.find(
            (establishment) => establishment.id === currentKey,
        );
        if (!establishmentFull) return;
        onSelectEstablishment(establishmentFull);
        onClose();
    };

    const renderEmptyState = () => (
        <EmptyStateText>
            {debouncedSearchQuery.length < 1 &&
            items.length <= 1 &&
            establishments?.data?.length > 0 ? (
                <FormattedMessage
                    defaultMessage="{nbEstablishments, plural, 
                    =0 {Aucun établissement}
                    =1 {Un établissement}
                    other {# établissements}
                }"
                    values={{ nbEstablishments: establishments?.data?.length }}
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
            <ListWrapper>
                <List
                    selectedKeys={[establishment?.id]}
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
                                <SelectedIcon icon={icon({ name: 'check', style: 'solid' })} />
                            </EstablishmentSelectListItemInnerWrapper>
                        </EstablishmentSelectListItem>
                    )}
                </List>
                {debouncedSearchQuery.length < 1 && items.length <= 1 && (
                    <CreateEstablishmentButton />
                )}
            </ListWrapper>
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
    max-height: 250px;
    overflow-y: auto;
`;
const SearchIcon = styled(FontAwesomeIcon)`
    font-size: 1rem;
    color: var(--neutral500);
`;
const CreateIcon = styled(FontAwesomeIcon)`
    width: 1rem;
    height: 1rem;
    color: var(--primary);
`;
const Escape = styled.div`
    padding: 0.25rem;
    border-radius: var(--r-s);
    border: 1px solid var(--neutral200);
    color: var(--neutral500);
    font-size: var(--fs-body-s);
    line-height: var(--lh-body-s);
`;
const CreateEstablishmentLink = styled(Link)`
    display: flex;
    align-items: center;
    column-gap: 0.5rem;
    cursor: pointer;
    padding: 0.5rem;
    border-radius: var(--r-s);

    &:hover {
        background-color: var(--neutral50);
    }
`;
const ListWrapper = styled.div`
    padding-block: 0.5rem;
    padding-inline: 0.5rem;
    display: flex;
    flex-direction: column;
    row-gap: 0.25rem;
`;
const EmptyStateText = styled(Text)`
    padding: 0.5rem;
`;

export default SelectEstablishment;
