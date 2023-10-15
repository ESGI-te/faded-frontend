import React from 'react';
import PropTypes from 'prop-types';
import { Outlet } from 'react-router-dom';

const DashboardLayout = (props) => {
    return (
        <div>
            <Outlet />
        </div>
    );
};

DashboardLayout.propTypes = {};

export default DashboardLayout;
