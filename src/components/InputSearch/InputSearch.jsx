import Input from '@components/Input';
import { SearchField as AriaSearchField } from 'react-aria-components';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import useOnclickOutside from 'react-cool-onclickoutside';
import InputPopover from '@components/InputPopover';
import Label from '@components/Label';
import IconButton from '@components/IconButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';

const InputSearch = ({
    value,
    results,
    onSelect,
    renderItems,
    onClickOutside,
    label,
    startIcon,
    errorMessage,
    ...props
}) => {
    const ref = useOnclickOutside(() => onClickOutside());
    const hasError = !!errorMessage;

    const valueProp = value ? { value } : {};

    return (
        <SearchField {...props} {...valueProp} ref={ref}>
            {label && <Label>{label}</Label>}
            <Input
                endIcon={
                    hasError ? (
                        <ErrorIcon icon={icon({ name: 'circle-exclamation', style: 'solid' })} />
                    ) : value.length > 0 ? (
                        <ClearButton
                            variant="ghost"
                            icon={<ClearIcon icon={icon({ name: 'xmark', style: 'solid' })} />}
                        />
                    ) : null
                }
                startIcon={startIcon}
            />
            {results?.length > 0 && (
                <InputPopover>
                    <List>
                        {renderItems
                            ? renderItems(results, { listItem: ListItem, onSelect })
                            : results.map((result) => (
                                  <ListItem
                                      value={result.name}
                                      key={result.id}
                                      onClick={() => onSelect(result)}
                                  >
                                      {result}
                                  </ListItem>
                              ))}
                    </List>
                </InputPopover>
            )}
        </SearchField>
    );
};

const ErrorIcon = styled(FontAwesomeIcon)`
    font-size: 1rem;
    color: var(--alert500);
`;
const ClearButton = styled(IconButton)`
    position: absolute;
    top: 50%;
    right: 0.5rem;
    transform: translateY(-50%);
    width: 1.25rem;
    height: 1.25rem;
    padding: 0.25rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: var(--r-full);

    &[data-hovered] {
        background-color: var(--neutral100);
    }
`;
const ClearIcon = styled(FontAwesomeIcon)`
    font-size: 1rem;
    color: var(--black);
`;
const List = styled.ul`
    list-style: none;
    padding: 0;
`;
const ListItem = styled.li`
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
`;
const SearchField = styled(AriaSearchField)`
    display: flex;
    flex-direction: column;
    row-gap: 0.5rem;
    width: 100%;
    position: relative;
`;

InputSearch.propTypes = {
    onChange: PropTypes.func.isRequired,
    onSelect: PropTypes.func.isRequired,
    onClickOutside: PropTypes.func.isRequired,
    renderItems: PropTypes.func,
    value: PropTypes.string,
    results: PropTypes.array,
    label: PropTypes.string,
    startIcon: PropTypes.element,
    errorMessage: PropTypes.string,
};

InputSearch.defaultProps = {
    value: '',
    results: [],
    onChange: () => {},
    onSelect: () => {},
    onClickOutside: () => {},
};

export default InputSearch;
