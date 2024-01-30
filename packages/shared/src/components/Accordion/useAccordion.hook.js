import { AccordionContext } from "../Accordion";
import { useContext } from "react";

export const useAccordion = () => {
	const accordionContext = useContext(AccordionContext);
	return accordionContext;
};
