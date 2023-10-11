export const useAuth = () => {
    const isAuthenticated = localStorage.getItem('accessToken') || false;
    return { isAuthenticated };
};
