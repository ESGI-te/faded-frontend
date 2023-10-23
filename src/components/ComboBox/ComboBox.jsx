import { ComboBox as AriaComboBox, Popover, ListBox } from 'react-aria-components';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';
import Label from '@components/Label';
import Input from '@components/Input';
import IconButton from '@components/IconButton';
import { useEffect, useRef, useState } from 'react';

const ComboBox = ({
    renderItem,
    label,
    endIcon,
    startIcon,
    errorMessage,
    children,
    isLoading,
    ...props
}) => {
    const hasError = !!errorMessage;
    const triggerRef = useRef(null);
    const [triggerWidth, setTriggerWidth] = useState(0);

    useEffect(() => {
        const width = triggerRef.current?.offsetWidth;
        setTriggerWidth(width);
    }, [triggerRef]);

    return (
        <InputWrapper {...props} selectedKey={props.value} ref={triggerRef}>
            <Label>{label}</Label>
            <Input
                endIcon={
                    hasError ? (
                        <ErrorIcon icon={icon({ name: 'circle-exclamation', style: 'solid' })} />
                    ) : (
                        endIcon
                    )
                }
                startIcon={startIcon}
                customButton={
                    <TriggerButton
                        variant="ghost"
                        icon={<ErrorIcon icon={icon({ name: 'caret-down', style: 'solid' })} />}
                    />
                }
                isLoading={isLoading}
            />
            <PopoverStyled style={{ width: triggerWidth + 'px' }}>
                <List>{children}</List>
            </PopoverStyled>
        </InputWrapper>
    );
};

const PopoverStyled = styled(Popover)`
    width: 100%;
    max-height: 10rem;
    overflow-y: scroll;
    background-color: var(--white);
    border-radius: var(--r-s);
    padding: 0.5rem;
    border: 1px solid var(--neutral500);
`;
const InputWrapper = styled(AriaComboBox)`
    display: flex;
    flex-direction: column;
    row-gap: 0.5rem;
    width: 100%;
    position: relative;
`;
const List = styled(ListBox)`
    list-style: none;
    padding: 0;
`;

const ErrorIcon = styled(FontAwesomeIcon)`
    font-size: 1.5rem;
    color: var(--black);
`;
const TriggerButton = styled(IconButton)`
    padding: 0;
`;

ComboBox.propTypes = {
    items: PropTypes.arrayOf(PropTypes.object),
    onSelectionChange: PropTypes.func,
    onInputChange: PropTypes.func,
    renderItem: PropTypes.func,
    label: PropTypes.string,
    endIcon: PropTypes.node,
    startIcon: PropTypes.node,
    errorMessage: PropTypes.string,
    isLoading: PropTypes.bool,
    children: PropTypes.node,
    value: PropTypes.string,
};

export default ComboBox;
