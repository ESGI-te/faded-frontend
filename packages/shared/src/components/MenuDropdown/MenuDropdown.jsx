import { Menu as AriaMenu } from 'react-aria-components';
import styled from 'styled-components';
import MenuDropdownItem from './MenuDropdownItem';
import PropTypes from 'prop-types';

const MenuDropdown = ({ children, ...props }) => {
    return (
        <Menu {...props}>
            {children ||
                ((item) => (
                    <MenuDropdownItem>
                        {item.icon}
                        {item.name}
                    </MenuDropdownItem>
                ))}
        </Menu>
    );
};

const Menu = styled(AriaMenu)`
    display: flex;
    flex-direction: column;
    row-gap: 0.25rem;
    max-width: 10rem;
    border-radius: var(--r-m);
    background-color: var(--white);
    box-shadow: 0px 8px 24px 0px rgba(0, 0, 0, 0.05);
    padding: 0.5rem;
`;

/* 
    cf. react-aria Menu props:  https://react-spectrum.adobe.com/react-aria/Menu.html#menu-1
*/
MenuDropdown.propTypes = {
    autoFocus: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    shouldFocusWrap: PropTypes.bool,
    items: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    disabledKeys: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    selectionMode: PropTypes.string,
    disallowEmptySelection: PropTypes.bool,
    selectedKeys: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
    defaultSelectedKeys: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
    className: PropTypes.string,
    style: PropTypes.object,
    onAction: PropTypes.func,
    onClose: PropTypes.func,
    onSelectionChange: PropTypes.func,
    slot: PropTypes.oneOfType([PropTypes.string, PropTypes.oneOf([null])]),
};

MenuDropdown.defaultProps = {
    autoFocus: false,
    shouldFocusWrap: false,
    items: [],
    selectionMode: 'single',
    disallowEmptySelection: false,
    onAction: () => {},
    onClose: () => {},
    onSelectionChange: () => {},
};

export default MenuDropdown;
