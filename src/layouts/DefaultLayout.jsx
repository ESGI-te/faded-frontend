import PropTypes from 'prop-types';
import { Outlet } from 'react-router-dom';

const DefaultLayout = (props) => {
    return (
        <div>
            <Outlet />
        </div>
    );
};

DefaultLayout.propTypes = {};

export default DefaultLayout;
