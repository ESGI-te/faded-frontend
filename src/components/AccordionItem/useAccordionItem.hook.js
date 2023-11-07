import { useContext } from 'react';
import { AccordionItemContext } from './AccordionItem.jsx';

export const useAccordionItem = () => {
    const accordionItemContext = useContext(AccordionItemContext);
    return accordionItemContext;
};
