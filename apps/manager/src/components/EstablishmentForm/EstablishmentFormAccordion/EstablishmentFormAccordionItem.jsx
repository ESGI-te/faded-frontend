import PropTypes from 'prop-types';
import styled from 'styled-components';
import AccordionItem from 'shared/src/components/AccordionItem';
import AccordionPanel from 'shared/src/components/AccordionPanel';
import EstablishmentFormAccordionButton from './EstablishmentFormAccordionButton';

const EstablishmentFormAccordionItem = ({ children, label, icon, ...props }) => {
    return (
        <AccordionItem {...props}>
            <AccordionItemInnerWrapper>
                <EstablishmentFormAccordionButton icon={icon}>
                    {label}
                </EstablishmentFormAccordionButton>
                <Panel>{children}</Panel>
            </AccordionItemInnerWrapper>
        </AccordionItem>
    );
};

const AccordionItemInnerWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    background-color: var(--white);
    border-radius: var(--r-l);
`;
const Panel = styled(AccordionPanel)`
    padding: 0.5rem 1.5rem 1.5rem;
`;

EstablishmentFormAccordionItem.propTypes = {
    children: PropTypes.node,
    label: PropTypes.string.isRequired,
    icon: PropTypes.node.isRequired,
};

export default EstablishmentFormAccordionItem;
