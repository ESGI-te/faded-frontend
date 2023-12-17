import { Navigate, useLocation } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { USER_ROLES } from '@utils/constants';
import useUserQuery from '@queries/user/useUserQuery.hook';
import { useAuth } from '@contexts/AuthProvider';

const ProtectedRoute = ({ children, roles }) => {
    const { isAuthenticated } = useAuth();
    const { data: user } = useUserQuery();
    const location = useLocation();
    const referrer = location.pathname;

    if (!isAuthenticated) {
        return <Navigate to={`/login?referrer=${referrer}`} />;
    }

    const isDenied = user && !user.roles.some((role) => roles.includes(role));

    if (isDenied) {
        return <Navigate to="/" />;
    }

    return children;
};

ProtectedRoute.propTypes = {
    children: PropTypes.node.isRequired,
    roles: PropTypes.arrayOf(PropTypes.oneOf(Object.values(USER_ROLES))),
};

export default ProtectedRoute;
