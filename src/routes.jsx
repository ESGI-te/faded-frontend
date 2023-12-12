import ProtectedRoute from '@components/ProtectedRoute';
import HomePage from '@pages/HomePage';
import LoginPage from '@pages/LoginPage';
import RegisterPage from '@pages/RegisterPage';
import DefaultLayout from './layouts/DefaultLayout';
import ProviderLayout from './layouts/ProviderLayout';
import { USER_ROLES } from '@utils/constants';
import DashboardPage from '@pages/provider/DashboardPage';
import AuthenticationLayout from './layouts/AuthenticationLayout';
import EstablishmentPage from '@pages/EstablishmentPage';
import EstablishmentSearchPage from '@pages/EstablishmentSearchPage';
import AppointmentPage from '@pages/AppointmentPage';
import EstablishmentAppointmentProvider from '@contexts/EstablishmentAppointmentProvider';
import AppointmentSummaryPage from '@pages/AppointmentSummaryPage';
import UserAppointmentsPage from '@pages/UserAppointmentsPage';
import ProfilePage from '@pages/ProfilePage';
import ProfileInformationPage from '@pages/ProfileInformationPage';

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
];

const providerRoutes = [
    /* Private routes */
    ...applyProtectedRoutes([
        {
            path: 'pro',
            element: <ProviderLayout />,
            children: [
                {
                    path: '',
                    element: <DashboardPage />,
                    roles: [USER_ROLES.ADMIN, USER_ROLES.PROVIDER],
                },
            ],
        },
    ]),
];

const adminRoutes = applyProtectedRoutes([]);

const routes = [...customerRoutes, ...providerRoutes, ...adminRoutes];

export default routes;
