export const useAuth = () => {
    const isAuthenticated = !!localStorage.getItem('token');

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user_roles');
    };

    return { isAuthenticated, logout };
};
