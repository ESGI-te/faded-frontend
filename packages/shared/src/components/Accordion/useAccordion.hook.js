import { AccordionContext } from '@ui/atoms/Accordion';
import { useContext } from 'react';

export const useAccordion = () => {
    const accordionContext = useContext(AccordionContext);
    return accordionContext;
};
