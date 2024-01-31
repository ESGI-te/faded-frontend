import { USER_ROLES } from 'shared/src/utils/constants';
import { ProtectedRoute } from './guards';

import LoginPage from '@pages/LoginPage';
import RegisterPage from '@pages/RegisterPage';
import DefaultLayout from '../layouts/DefaultLayout';
import AuthenticationLayout from '../layouts/AuthenticationLayout';
import NoRouteFoundPage from '@pages/status/404Page';
import ProviderOverviewPage from '@pages/OverviewPage';
import ProviderTeamPage from '@pages/TeamPage';
import ProviderEstablishmentsPage from '@pages/EstablishmentsPage';
import ProviderAppointmentsPage from '@pages/AppointmentsPage';
import EstablishmentOverviewPage from '@pages/EstablishmentOverviewPage';
import EstablishmentTeamPage from '@pages/EstablishmentTeamPage';
import EstablishmentSettingsPage from '@pages/EstablishmentSettingsPage';
import EstablishmentAppointmentsPage from '@pages/EstablishmentAppointmentsPage';
import PasswordForgottenPage from '@pages/PasswordForgottenPage';
import ResetPasswordPage from '@pages/ResetPasswordPage';
import ProviderRequestPage from '@pages/ProviderRequestPage';
import ProviderRequestSuccessPage from '@pages/ProviderRequestSuccessPage';
import FullPageLayout from '../layouts/FullPageLayout';
import EstablishmentFormPage from '@pages/EstablishmentFormPage/EstablishmentFormPage';
import EstablishmentNameFormPage from '@pages/EstablishmentNameFormPage';
import EstablishmentSchedulesPage from '@pages/EstablishmentSchedulesPage';
import EstablishmentServicesPage from '@pages/EstablishmentServicesPage';
import ServicesPage from '@pages/ServicesPage';

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
            {
                path: 'request',
                children: [
                    {
                        path: '',
                        name: 'request',
                        element: <ProviderRequestPage />,
                    },
                    {
                        path: 'success',
                        element: <ProviderRequestSuccessPage />,
                    },
                ],
            },
        ],
    },
    ...applyProtectedRoutes([
        {
            element: <DefaultLayout />,
            children: [
                {
                    path: '',
                    exact: true,
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
                {
                    path: 'services',
                    element: <ServicesPage />,
                    roles: [USER_ROLES.ADMIN, USER_ROLES.PROVIDER],
                },
                /* ESTABLISHMENT */
                {
                    path: ':establishmentId',
                    exact: true,
                    element: <EstablishmentOverviewPage />,
                },
                {
                    path: ':establishmentId/team',
                    element: <EstablishmentTeamPage />,
                },
                {
                    path: ':establishmentId/appointments',
                    element: <EstablishmentAppointmentsPage />,
                },
                {
                    path: ':establishmentId/settings',
                    element: <EstablishmentSettingsPage />,
                },
                {
                    path: ':establishmentId/schedules',
                    element: <EstablishmentSchedulesPage />,
                },
                {
                    path: ':establishmentId/services',
                    element: <EstablishmentServicesPage />,
                },
            ],
        },
        {
            path: 'new',
            element: (
                <FullPageLayout>
                    <EstablishmentNameFormPage />
                </FullPageLayout>
            ),
        },
        {
            path: ':establishmentId/edit',
            element: (
                <FullPageLayout>
                    <EstablishmentFormPage />
                </FullPageLayout>
            ),
        },
    ]),
    {
        path: '*',
        element: <NoRouteFoundPage />,
    },
];

export default routes;
