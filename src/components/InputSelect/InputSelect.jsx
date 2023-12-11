import { Select, Popover, ListBox, ListBoxItem, Button, SelectValue } from 'react-aria-components';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';
import Label from '@components/Label';
import { useRef } from 'react';

const InputSelect = ({ label, endIcon, startIcon, errorMessage, children, items, ...props }) => {
    const triggerRef = useRef(null);

    return (
        <InputWrapper {...props} ref={triggerRef}>
            {label && <Label>{label}</Label>}
            <InputButton>
                <SelectValue />
                <span>
                    <CarretIcon icon={icon({ name: 'caret-down', style: 'solid' })} />
                </span>
            </InputButton>
            <PopoverStyled>
                <List items={items}>
                    {children || ((item) => <ListItem>{item.name}</ListItem>)}
                </List>
            </PopoverStyled>
        </InputWrapper>
    );
};

const PopoverStyled = styled(Popover)`
    width: 100%;
    max-width: var(--trigger-width);
    max-height: 10rem;
    overflow-y: scroll;
    background-color: var(--white);
    border-radius: var(--r-s);
    padding: 0.5rem;
    border: 1px solid var(--neutral500);
`;
const InputButton = styled(Button)`
    height: 100%;
    padding: 1rem;
    border: solid var(--black) 1px;
    border-radius: var(--r-s);
    width: 100%;
    background-color: var(--white);
    display: flex;
    align-items: center;
    justify-content: space-between;
    column-gap: 0.5rem;
    cursor: pointer;

    &[data-disabled] {
        cursor: not-allowed;
        pointer-events: none;
        color: var(--neutral500);
        background-color: var(--neutral50);
        border-color: var(--neutral500);
    }

    &[data-hovered] {
        border-color: var(--primary500);
    }

    &[data-focused] {
        outline: 2px solid var(--primary500);
    }

    &[data-invalid] {
        border-color: var(--alert500);
    }

    &[data-invalid] + &[data-focused] {
        outline: solid 2px var(--alert50);
    }
`;
const InputWrapper = styled(Select)`
    display: flex;
    flex-direction: column;
    row-gap: 0.5rem;
    width: 100%;
    height: 3rem;
    position: relative;
`;
const List = styled(ListBox)`
    list-style: none;
    padding: 0;
    display: flex;
    flex-direction: column;
    row-gap: 0.25rem;
`;
const ListItem = styled(ListBoxItem)`
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
        background-color: var(--primary400);
        color: var(--white);
        font-weight: var(--fw-semibold);
    }
    &[data-focused] {
        outline: 2px solid var(--primary500);
    }
`;
const CarretIcon = styled(FontAwesomeIcon)`
    font-size: 1.5rem;
    color: var(--black);
`;

InputSelect.propTypes = {
    items: PropTypes.arrayOf(PropTypes.object),
    onSelectionChange: PropTypes.func,
    label: PropTypes.string,
    endIcon: PropTypes.node,
    startIcon: PropTypes.node,
    errorMessage: PropTypes.string,
    children: PropTypes.node,
    value: PropTypes.string,
};

export default InputSelect;
