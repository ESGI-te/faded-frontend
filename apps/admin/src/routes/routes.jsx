import { ProtectedRoute } from './guards';

import HomePage from '@pages/HomePage';
import LoginPage from '@pages/LoginPage';
import DefaultLayout from '../layouts/DefaultLayout';
import AuthenticationLayout from '../layouts/AuthenticationLayout';
import NoRouteFoundPage from '@pages/status/404Page';
import PasswordForgottenPage from '@pages/PasswordForgottenPage';
import ResetPasswordPage from '@pages/ResetPasswordPage';
import { USER_ROLES } from 'shared/src/utils/constants';

const applyProtectedRoutes = (routes) =>
    routes.map((route) => {
        if (route.children) {
            route.children = applyProtectedRoutes(route.children);
        }

        if (route.roles) {
            route.element = <ProtectedRoute roles={route.roles}>{route.element}</ProtectedRoute>;
        }

        return route;
    });

const routes = [
    /* Authentication routes */
    {
        element: <AuthenticationLayout />,
        children: [
            {
                path: '/login',
                name: 'login',
                element: <LoginPage />,
            },
            {
                path: '/password-forgotten',
                name: 'password-forgotten',
                element: <PasswordForgottenPage />,
            },
            {
                path: 'reset-password',
                name: 'reset-password',
                element: <ResetPasswordPage />,
            },
        ],
    },
    ...applyProtectedRoutes([
        {
            element: <DefaultLayout />,
            children: [
                {
                    path: '/',
                    element: <HomePage />,
                },
            ],
            roles: [USER_ROLES.ADMIN],
        },
    ]),
    {
        path: '*',
        element: <NoRouteFoundPage />,
    },
];

export default routes;
