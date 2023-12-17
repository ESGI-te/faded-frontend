import { getUser } from '@api/api';
import userKeys from '@queries/user/userKeys';
import { createContext, useContext, useState } from 'react';
import { queryClient } from '@/App';

const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user_roles');
        setIsAuthenticated(false);
    };

    const onAuthenticate = async (token) => {
        localStorage.setItem('token', token);
        await queryClient.fetchQuery({ queryKey: userKeys.detail, queryFn: getUser });
        setIsAuthenticated(true);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, onAuthenticate, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
