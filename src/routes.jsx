import ProtectedRoute from '@components/ProtectedRoute';
import HomePage from '@pages/HomePage';
import LoginPage from '@pages/LoginPage';
import ProviderRequestPage from '@pages/ProviderRequestPage';
import RegisterPage from '@pages/RegisterPage';
import DefaultLayout from './layouts/DefaultLayout';
import ProLayout from './layouts/ProLayout';
import { USER_ROLES } from '@utils/constants';
import AuthenticationLayout from './layouts/AuthenticationLayout';
import EstablishmentPage from '@pages/EstablishmentPage';
import EstablishmentSearchPage from '@pages/EstablishmentSearchPage';
import AppointmentPage from '@pages/AppointmentPage';
import EstablishmentAppointmentProvider from '@contexts/EstablishmentAppointmentProvider';
import AppointmentSummaryPage from '@pages/AppointmentSummaryPage';
import UserAppointmentsPage from '@pages/UserAppointmentsPage';
import ProfilePage from '@pages/ProfilePage';
import ProfileInformationPage from '@pages/ProfileInformationPage';
import ProviderRequestSuccessPage from '@pages/ProviderRequestSuccessPage';
import ProviderRequestPasswordSetPage from '@pages/ProviderRequestPasswordSetPage';
import { Navigate } from 'react-router-dom';
import NoRouteFoundPage from '@pages/status/404Page';
import ProviderOverviewPage from '@pages/provider/ProviderOverviewPage';
import ProviderTeamPage from '@pages/provider/ProviderTeamPage';
import ProviderEstablishmentsPage from '@pages/provider/ProviderEstablishmentsPage';
import ProviderAppointmentsPage from '@pages/provider/ProviderAppointmentsPage';
import EstablishmentOverviewPage from '@pages/provider/EstablishmentOverviewPage';
import EstablishmentTeamPage from '@pages/provider/EstablishmentTeamPage';
import EstablishmentAppointmentsPage from '@pages/provider/EstablishmentAppointmentsPage';
import EstablishmentSettingsPage from '@pages/provider/EstablishmentSettingsPage';

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

const customerRoutes = [
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
            {
                path: 'provider-request',
                children: [
                    {
                        path: '',
                        name: 'provider-request',
                        element: <ProviderRequestPage />,
                    },
                    {
                        path: 'success',
                        element: <ProviderRequestSuccessPage />,
                    },
                    {
                        path: 'password-set/',
                        element: <ProviderRequestPasswordSetPage />,
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

const proRoutes = [
    ...applyProtectedRoutes([
        {
            path: 'pro',
            element: <ProLayout />,
            children: [
                {
                    path: '',
                    element: <Navigate to="overview" />,
                },
                {
                    path: 'overview',
                    element: <ProviderOverviewPage />,
                    roles: [USER_ROLES.ADMIN, USER_ROLES.PROVIDER],
                },
                {
                    path: 'team',
                    element: <ProviderTeamPage />,
                    roles: [USER_ROLES.ADMIN, USER_ROLES.PROVIDER],
                },
                {
                    path: 'establishments',
                    element: <ProviderEstablishmentsPage />,
                    roles: [USER_ROLES.ADMIN, USER_ROLES.PROVIDER],
                },
                {
                    path: 'appointments',
                    element: <ProviderAppointmentsPage />,
                    roles: [USER_ROLES.ADMIN, USER_ROLES.PROVIDER],
                },
                /* ESTABLISHMENT */
                {
                    path: 'establishment/:establishmentId',
                    children: [
                        {
                            path: '',
                            element: <Navigate to="overview" />,
                        },
                        {
                            path: 'overview',
                            element: <EstablishmentOverviewPage />,
                        },
                        {
                            path: 'team',
                            element: <EstablishmentTeamPage />,
                        },
                        {
                            path: 'appointments',
                            element: <EstablishmentAppointmentsPage />,
                        },
                        {
                            path: 'settings',
                            element: <EstablishmentSettingsPage />,
                        },
                    ],
                },
            ],
        },
    ]),
];

const adminRoutes = applyProtectedRoutes([]);

const routes = [...customerRoutes, ...proRoutes, ...adminRoutes];

export default routes;
