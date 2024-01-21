import PropTypes from 'prop-types';
import { TabList as AriaTabList } from 'react-aria-components';
import styled from 'styled-components';

const TabList = (props) => {
    return <TabListStyled {...props} />;
};

const TabListStyled = styled(AriaTabList)`
    display: flex;
    column-gap: 1rem;
`;

TabList.propTypes = {};

export default TabList;
