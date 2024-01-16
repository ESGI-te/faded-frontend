import { USER_ROLES } from 'shared/src/utils/constants';
import { ProtectedRoute } from './guards';

import HomePage from '@pages/HomePage';
import LoginPage from '@pages/LoginPage';
import RegisterPage from '@pages/RegisterPage';
import DefaultLayout from '../layouts/DefaultLayout';
import AuthenticationLayout from '../layouts/AuthenticationLayout';
import EstablishmentPage from '@pages/EstablishmentPage';
import EstablishmentSearchPage from '@pages/EstablishmentSearchPage';
import AppointmentPage from '@pages/AppointmentPage';
import EstablishmentAppointmentProvider from '@contexts/EstablishmentAppointmentProvider';
import AppointmentSummaryPage from '@pages/AppointmentSummaryPage';
import UserAppointmentsPage from '@pages/UserAppointmentsPage';
import ProfilePage from '@pages/ProfilePage';
import ProfileInformationPage from '@pages/ProfileInformationPage';
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
    /* Public routes */
    {
        element: <DefaultLayout />,
        children: [
            {
                path: '/',
                element: <HomePage />,
            },
            {
                path: 'establishments',
                element: <EstablishmentSearchPage />,
            },
            {
                path: 'establishments/:establishmentId',
                element: <EstablishmentAppointmentProvider />,
                children: [
                    {
                        path: 'appointment',
                        element: <AppointmentPage />,
                    },
                    {
                        path: '',
                        element: <EstablishmentPage />,
                    },
                ],
            },
        ],
    },
    /* Private routes */
    ...applyProtectedRoutes([
        {
            element: <DefaultLayout />,
            children: [
                {
                    element: <ProfilePage />,
                    roles: [USER_ROLES.USER],
                    path: 'profile',
                    children: [
                        {
                            path: '',
                            element: <ProfileInformationPage />,
                            roles: [USER_ROLES.USER],
                        },
                        {
                            path: 'appointments',
                            element: <UserAppointmentsPage />,
                            roles: [USER_ROLES.USER],
                        },
                    ],
                },
                {
                    path: 'appointment/:appointmentId/success',
                    element: <AppointmentSummaryPage />,
                    roles: [USER_ROLES.USER],
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
