import { Children, createContext, useState } from 'react';
import PropTypes from 'prop-types';
import Stack from '@components/Stack';

export const AccordionContext = createContext({});

const Accordion = ({ children, defaultIndex, onToggle, allowMultiple, className }) => {
    const [openIndex, setOpenIndex] = useState(defaultIndex ?? (allowMultiple ? [] : null));
    const [prevIndex, setPrevIndex] = useState(null);
    const [disabledIndexes, setDisabledIndexes] = useState([]);

    const handleToggle = (index) => {
        if (disabledIndexes.includes(index)) return;

        onToggle && onToggle(index);

        if (!allowMultiple) {
            setOpenIndex((i) => {
                if (i === index) return null;
                setPrevIndex(i);
                return index;
            });
            return;
        }

        if (openIndex.includes(index)) {
            setOpenIndex((indexes) => {
                setPrevIndex(indexes);
                return indexes.filter((i) => i !== index);
            });
            return;
        }

        setOpenIndex((indexes) => {
            setPrevIndex(indexes);
            return [...indexes, index];
        });
    };

    const handleDisabledIndexes = (index, isDisabled) => {
        if (isDisabled === false && disabledIndexes.includes(index)) {
            setDisabledIndexes((indexes) => indexes.filter((i) => i !== index));
            return;
        } else if (isDisabled === true) {
            setDisabledIndexes((indexes) => [...indexes, index]);
            setOpenIndex((indexes) => {
                if (allowMultiple) {
                    return indexes.filter((i) => i !== index);
                }
                return indexes === index ? null : indexes;
            });
        }
    };

    // TODO: Find a way to get current focus to handle nextIndex method for multiple accordions
    const goToNextIndex = () => {
        const isNextIndexDisabled = disabledIndexes.includes(openIndex + 1);
        let nextIndex = isNextIndexDisabled ? openIndex + 2 : openIndex + 1;

        if (allowMultiple || nextIndex > Children.count(children)) return;

        handleToggle(nextIndex);
    };

    const goToIndex = (index) => {
        if (!index || index > Children.count(children)) return;
        if (allowMultiple) {
            if (openIndex.includes(index)) {
                setOpenIndex((indexes) => indexes.filter((i) => i === index));
            } else {
                setOpenIndex([index]);
            }
            return;
        }
        setOpenIndex(index);
    };

    return (
        <AccordionContext.Provider value={{ openIndex, handleToggle, goToIndex, goToNextIndex }}>
            <Stack className={className} $gap="1rem">
                {Children.map(children, (item, i) => {
                    if (!item) return;
                    const Item = item.type;
                    return (
                        <Item
                            {...item.props}
                            isExpanded={allowMultiple ? openIndex.includes(i) : openIndex === i}
                            onToggle={() => handleToggle(i)}
                            index={i}
                            openIndex={openIndex}
                            prevIndex={prevIndex}
                            onDisabled={handleDisabledIndexes}
                        />
                    );
                })}
            </Stack>
        </AccordionContext.Provider>
    );
};

Accordion.propTypes = {
    children: PropTypes.arrayOf(PropTypes.node).isRequired,
    defaultIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.arrayOf(PropTypes.number)]),
    onToggle: PropTypes.func,
    allowMultiple: PropTypes.bool,
    isDisabled: PropTypes.bool,
    className: PropTypes.string,
};

Accordion.defaultProps = {
    onToggle: () => {},
    allowMultiple: false,
};

export default Accordion;
