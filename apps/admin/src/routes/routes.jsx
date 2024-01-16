import { ProtectedRoute } from './guards';

import HomePage from '@pages/HomePage';
import LoginPage from '@pages/LoginPage';
import RegisterPage from '@pages/RegisterPage';
import DefaultLayout from '../layouts/DefaultLayout';
import AuthenticationLayout from '../layouts/AuthenticationLayout';
import NoRouteFoundPage from '@pages/status/404Page';
import PasswordForgottenPage from '@pages/PasswordForgottenPage';
import ResetPasswordPage from '@pages/ResetPasswordPage';

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
                path: '/register',
                name: 'register',
                element: <RegisterPage />,
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
        },
    ]),
    {
        path: '*',
        element: <NoRouteFoundPage />,
    },
];

export default routes;
