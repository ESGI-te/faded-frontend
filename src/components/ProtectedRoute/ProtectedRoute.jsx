import { useAuth } from '@hooks/useAuth';
import { Navigate } from 'react-router-dom';
import { PropTypes } from 'prop-types';

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated } = useAuth();

    if (!isAuthenticated) return <Navigate to="/login" />;

    return children;
};

ProtectedRoute.propTypes = {
    children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
