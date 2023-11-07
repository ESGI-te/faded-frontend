import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useAccordionItem } from '../AccordionItem/useAccordionItem.hook';

const AccordionButton = ({ children, ...props }) => {
    const { onToggle, isDisabled } = useAccordionItem();

    const handleClick = () => {
        onToggle();
        props?.onClick?.();
    };

    return (
        <NoStyleButton onClick={handleClick} isDisabled={isDisabled} {...props}>
            {children}
        </NoStyleButton>
    );
};

const NoStyleButton = styled.button`
    padding: 0;
    background: none;
    border: none;
    width: 100%;

    ${({ isDisabled }) => isDisabled && 'pointer-events: none;'}
`;

AccordionButton.propTypes = {
    children: PropTypes.node,
    onClick: PropTypes.func,
};

export default AccordionButton;
