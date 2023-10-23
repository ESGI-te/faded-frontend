import React from 'react';
import PropTypes from 'prop-types';
import { Outlet } from 'react-router-dom';

const ProLayout = (props) => {
    return (
        <div>
            <Outlet />
        </div>
    );
};

ProLayout.propTypes = {};

export default ProLayout;
