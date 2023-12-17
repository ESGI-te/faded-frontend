import PropTypes from 'prop-types';
import { Checkbox as AriaCheckbox } from 'react-aria-components';
import styled from 'styled-components';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Checkbox = ({ children, ...props }) => {
    return (
        <CheckboxWrapper {...props}>
            {({ isSelected }) => (
                <>
                    <CheckboxInner>
                        {isSelected && <CheckIcon icon={icon({ name: 'check', style: 'solid' })} />}
                    </CheckboxInner>
                    {children}
                </>
            )}
        </CheckboxWrapper>
    );
};

const CheckboxInner = styled.div`
    border: 2px solid var(--neutral300);
    width: 1rem;
    height: 1rem;
    border-radius: var(--r-xs);
    display: flex;
    align-items: center;
    justify-content: center;
`;
const CheckboxWrapper = styled(AriaCheckbox)`
    cursor: pointer;
    width: fit-content;

    &[data-selected] > ${CheckboxInner} {
        background-color: var(--black);
        border-color: var(--black);
    }

    &[data-focused] > ${CheckboxInner} {
        outline: 2px solid var(--primary200);
    }

    &[data-hovered] > ${CheckboxInner} {
        border-color: var(--primary);
    }
`;
const CheckIcon = styled(FontAwesomeIcon)`
    width: 0.75rem;
    height: 0.75rem;
    color: var(--white);
`;

Checkbox.propTypes = {
    children: PropTypes.node,
};

export default Checkbox;
