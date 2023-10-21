import ProtectedRoute from '@components/ProtectedRoute';
import HomePage from '@pages/HomePage';
import LoginPage from '@pages/LoginPage';
import RegisterPage from '@pages/RegisterPage';
import DefaultLayout from './layouts/DefaultLayout';
import DashboardLayout from './layouts/DashboardLayout';
import { USER_ROLES } from '@utils/constants';
import DashboardPage from '@pages/DashboardPage';
import AuthenticationLayout from './layouts/AuthenticationLayout';

const applyProtectedRoutes = (routes) => {
    return routes.map((route) => {
        if (route.children) {
            route.children = applyProtectedRoutes(route.children);
        }

        if (route.roles) {
            route.element = <ProtectedRoute roles={route.roles}>{route.element}</ProtectedRoute>;
        }

        return route;
    });
};

const authenticationRoutes = [
    {
        element: <AuthenticationLayout />,
        children: [
            {
                path: '/login',
                name: 'login',
                element: <LoginPage />,
            },
            {
                path: '/register',
                name: 'register',
                element: <RegisterPage />,
            },
        ],
    },
];

const publicRoutes = [
    {
        element: <DefaultLayout />,
        children: [
            {
                path: '/',
                element: <HomePage />,
            },
        ],
    },
];

const privateRoutes = [
    {
        path: 'dashboard',
        element: <DashboardLayout />,
        children: [
            {
                path: '',
                element: <DashboardPage />,
                roles: [USER_ROLES.ADMIN, USER_ROLES.MANAGER, USER_ROLES.BARBER],
            },
        ],
    },
    {
        element: <DefaultLayout />,
        children: [
            {
                path: 'profile',
                element: <HomePage />,
                roles: [USER_ROLES.USER],
            },
        ],
    },
];

const protectedPrivateRoutes = applyProtectedRoutes(privateRoutes);

const routes = [...authenticationRoutes, ...publicRoutes, ...protectedPrivateRoutes];

export default routes;
