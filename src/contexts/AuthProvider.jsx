import { getUser } from '@api/api';
import { createContext, useContext, useState } from 'react';

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
        const user = await getUser();
        localStorage.setItem('user_roles', JSON.stringify(user.roles));
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
