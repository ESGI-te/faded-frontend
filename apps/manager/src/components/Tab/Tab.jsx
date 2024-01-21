import PropTypes from 'prop-types';
import { Tab as AriaTab } from 'react-aria-components';
import styled from 'styled-components';

const Tab = (props) => {
    return <TabStyled {...props} />;
};

const TabStyled = styled(AriaTab)``;

Tab.propTypes = {};

export default Tab;
