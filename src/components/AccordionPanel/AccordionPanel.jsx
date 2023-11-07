import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { useAccordionItem } from '../AccordionItem/useAccordionItem.hook';

const AccordionPanel = ({ children, className }) => {
    const { isExpanded } = useAccordionItem();

    return (
        <Pannel className={className} isExpanded={isExpanded}>
            {children}
        </Pannel>
    );
};

const Pannel = styled.div`
    max-height: 0;
    transition: all 0.2s ease;

    ${({ isExpanded }) =>
        isExpanded
            ? css`
                  max-height: 200vh;
              `
            : css`
                  overflow: hidden;
              `}
`;

AccordionPanel.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
};

export default AccordionPanel;
