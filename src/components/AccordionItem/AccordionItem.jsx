import { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

export const AccordionItemContext = createContext({});

const AccordionItem = ({
    children,
    isExpanded,
    onToggle,
    index,
    prevIndex,
    isDisabled,
    onDisabled,
}) => {
    const [hasClosed, setHasClosed] = useState(false);

    useEffect(() => {
        onDisabled(index, isDisabled);
    }, [isDisabled]);

    useEffect(() => {
        if (prevIndex !== index) {
            if (hasClosed) setHasClosed(false);
            return;
        }
        setHasClosed(true);
    }, [prevIndex]);

    return (
        <AccordionItemContext.Provider
            value={{ isExpanded, onToggle, index, hasClosed, isDisabled }}
        >
            {children}
        </AccordionItemContext.Provider>
    );
};

AccordionItem.propTypes = {
    children: PropTypes.node,
    isExpanded: PropTypes.bool,
    isDisabled: PropTypes.bool,
    onToggle: PropTypes.func,
    index: PropTypes.number,
    prevIndex: PropTypes.number,
    onDisabled: PropTypes.func,
};

AccordionItem.defaultProps = {
    isExpanded: false,
    isDisabled: false,
    onToggle: () => {},
};

export default AccordionItem;
