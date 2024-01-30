import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { icon as iconFA } from '@fortawesome/fontawesome-svg-core/import.macro';
import Text from 'shared/src/components/Text';
import { useAccordionItem } from 'shared/src/components/AccordionItem/useAccordionItem.hook';
import styled, { css } from 'styled-components';
import AccordionButton from 'shared/src/components/AccordionButton';
import Cluster from 'shared/src/components/Cluster';

const EstablishmentFormAccordionButton = ({ children, icon }) => {
    const { isExpanded } = useAccordionItem();

    return (
        <AccordionButtonStyled>
            <Cluster gap="1rem" align="center">
                <IconWrapper>{icon}</IconWrapper>
                <Text variant="headingS" fontWeight="--fw-semibold">
                    {children}
                </Text>
            </Cluster>
            <ChevronIcon
                isExpanded={isExpanded}
                icon={iconFA({ name: 'chevron-down', style: 'solid' })}
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
const IconWrapper = styled.div`
    width: 2.5rem;
    height: 2.5rem;
    border-radius: var(--r-s);
    background-color: var(--neutral50);
    display: flex;
    align-items: center;
    justify-content: center;
`;
const AccordionButtonStyled = styled(AccordionButton)`
    width: 100%;
    padding: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
`;

EstablishmentFormAccordionButton.propTypes = {
    children: PropTypes.node,
    icon: PropTypes.node.isRequired,
};

export default EstablishmentFormAccordionButton;
