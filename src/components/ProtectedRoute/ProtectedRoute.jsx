import { Navigate } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { USER_ROLES } from '@utils/constants';
import useUserQuery from '@queries/user/useUserQuery.hook';
import { useAuth } from '@contexts/AuthProvider';

const ProtectedRoute = ({ children, roles }) => {
    const { isAuthenticated } = useAuth();
    const { data: user } = useUserQuery();

    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    const userRoles = user?.roles || JSON.parse(localStorage.getItem('user_roles'));
    const isDenied = !userRoles?.some((role) => roles.includes(role));

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
