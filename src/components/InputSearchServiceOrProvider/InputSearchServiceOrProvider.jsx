import useDebounce from '@hooks/useDebounce.hook';
import { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import Text from '@components/Text';
import { ListBoxItem } from 'react-aria-components';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';
import { ComboBoxController } from '@components/ComboBox/ComboBox.controller';
import useServiceCategoriesQuery from '@queries/serviceCategory/useServiceCategoriesQuery.hook';
import useEstablishmentSuggestionsQuery from '@queries/establishment/useEstablishmentSuggestionsQuery.hook';

const ListItem = ({ item }) => {
    if (item.type === 'establishment')
        return (
            <ListItemStyled id={item.id} href={`/establishments/${item.id}`} textValue={item.name}>
                <ListItemIcon icon={icon({ name: 'shop', style: 'solid' })} />
                <Text fontWeight="--fw-semibold">{item.name}</Text>
            </ListItemStyled>
        );

    return (
        <ListItemStyled id={item.id} textValue={item.name}>
            {({ isSelected }) => (
                <>
                    <ListItemIcon icon={icon({ name: 'scissors', style: 'solid' })} />
                    <Text fontWeight="--fw-semibold">{item.name}</Text>
                    {isSelected && (
                        <ListItemIconCheck icon={icon({ name: 'circle-check', style: 'solid' })} />
                    )}
                </>
            )}
        </ListItemStyled>
    );
};

const InputSearchServiceOrProvider = ({ onChange, onSelectionChange, ...props }) => {
    const [query, setQuery] = useState('');
    const debouncedQuery = useDebounce(query, 300);
    const categories = useServiceCategoriesQuery();
    const establishments = useEstablishmentSuggestionsQuery({ name: debouncedQuery });

    const formattedCategories = useMemo(
        () =>
            categories.data?.data?.map((category) => ({
                ...category,
                type: 'category',
            })) || [],
        [categories.data],
    );

    const filteredCategories = useMemo(() => {
        return query
            ? formattedCategories.filter((category) =>
                  category.name.toLowerCase().includes(query.toLowerCase()),
              )
            : formattedCategories;
    }, [formattedCategories, query]);

    const formattedEstablishments = useMemo(
        () =>
            establishments.data?.data?.map((establishment) => ({
                ...establishment,
                type: 'establishment',
            })) || [],
        [establishments.data],
    );

    const suggestions = useMemo(() => {
        return [...formattedEstablishments, ...filteredCategories];
    }, [filteredCategories, formattedEstablishments]);

    const handleInputChange = (value) => {
        onChange(value);
        const isAlreadyFetched = suggestions.some((suggestion) => suggestion.name === value);
        if (isAlreadyFetched) return;
        setQuery(value);
    };

    return (
        <ComboBoxController
            {...props}
            onInputChange={handleInputChange}
            isLoading={establishments.isFetching}
            defaultItems={suggestions}
        >
            {(item) => <ListItem item={item} />}
        </ComboBoxController>
    );
};

const ListItemStyled = styled(ListBoxItem)`
    display: flex;
    align-items: center;
    column-gap: 0.5rem;
    padding-block: 0.25rem;
    padding-inline: 0.5rem;
    border-radius: var(--r-xs);
    cursor: pointer;

    &:hover {
        background-color: var(--primary50);
    }

    &[data-selected] {
        background-color: var(--primary200);
    }
`;
const ListItemIcon = styled(FontAwesomeIcon)`
    font-size: 0.875rem;
    color: var(--black);
`;
const ListItemIconCheck = styled(ListItemIcon)`
    color: var(--primary500);
    margin-left: auto;
`;

InputSearchServiceOrProvider.propTypes = {
    onChange: PropTypes.func,
    onSelectionChange: PropTypes.func,
};

InputSearchServiceOrProvider.defaultProps = {
    onChange: () => {},
    onSelectionChange: () => {},
};

export default InputSearchServiceOrProvider;
