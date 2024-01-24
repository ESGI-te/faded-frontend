import PropTypes from 'prop-types';
import styled from 'styled-components';
import AccordionItem from 'shared/src/components/AccordionItem';
import AccordionPanel from 'shared/src/components/AccordionPanel';
import EstablishmentFormAccordionButton from './EstablishmentFormAccordionButton';

const EstablishmentFormAccordionItem = ({ children, label, ...props }) => {
    return (
        <AccordionItem {...props}>
            <AccordionItemInnerWrapper>
                <EstablishmentFormAccordionButton>{label}</EstablishmentFormAccordionButton>
                <AccordionPanel>{children}</AccordionPanel>
            </AccordionItemInnerWrapper>
        </AccordionItem>
    );
};

const AccordionItemInnerWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    background-color: var(--white);
    border-radius: var(--r-s);
`;

EstablishmentFormAccordionItem.propTypes = {
    children: PropTypes.node,
    label: PropTypes.string.isRequired,
};

export default EstablishmentFormAccordionItem;
