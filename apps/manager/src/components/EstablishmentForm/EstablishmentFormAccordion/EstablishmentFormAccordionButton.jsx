import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';
import Text from 'shared/src/components/Text';
import { useAccordionItem } from 'shared/src/components/AccordionItem/useAccordionItem.hook';
import styled, { css } from 'styled-components';
import AccordionButton from 'shared/src/components/AccordionButton';

const EstablishmentFormAccordionButton = ({ children }) => {
    const { isExpanded } = useAccordionItem();

    return (
        <AccordionButtonStyled>
            <Text variant="headingS" fontWeight="--fw-semibold">
                {children}
            </Text>
            <ChevronIcon
                isExpanded={isExpanded}
                icon={icon({ name: 'chevron-down', style: 'solid' })}
            />
        </AccordionButtonStyled>
    );
};

const ChevronIcon = styled(FontAwesomeIcon)`
    width: 1rem;
    height: 1rem;
    transition: transform 0.3s ease;

    ${({ isExpanded }) =>
        isExpanded &&
        css`
            transform: rotate(180deg);
        `}
`;
const AccordionButtonStyled = styled(AccordionButton)`
    width: 100%;
    padding: 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
`;

EstablishmentFormAccordionButton.propTypes = {
    children: PropTypes.node,
};

export default EstablishmentFormAccordionButton;
