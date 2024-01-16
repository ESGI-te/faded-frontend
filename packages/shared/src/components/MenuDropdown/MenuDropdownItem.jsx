import { MenuItem as AriaMenuItem } from 'react-aria-components';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const MenuDropdownItem = ({ children, ...props }) => {
    return <MenuItem {...props}>{children}</MenuItem>;
};

const MenuItem = styled(AriaMenuItem)`
    width: 100%;
    display: flex;
    align-items: center;
    column-gap: 0.5rem;
    padding: 0.25rem 0.5rem;
    border-radius: var(--r-s);
    background-color: transparent;
    color: var(--black);
    cursor: pointer;

    &[data-hovered] {
        background-color: var(--neutral50);
    }

    &[data-focused] {
        outline: none;
    }
`;

/* 
    cf. react-aria MenuItem props: https://react-spectrum.adobe.com/react-aria/Menu.html#menuitem
*/
MenuDropdownItem.propTypes = {
    value: PropTypes.object,
    textValue: PropTypes.string,
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
    className: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
    href: PropTypes.string,
    target: PropTypes.string,
    rel: PropTypes.string,
    download: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    ping: PropTypes.string,
    referrerPolicy: PropTypes.string,
};

export default MenuDropdownItem;
