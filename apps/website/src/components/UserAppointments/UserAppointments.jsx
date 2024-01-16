import { useMemo } from 'react';
import UserAppointmentsList from '@components/UserAppointmentsList';
import useAppointmentsQuery from 'shared/src/queries/appointment/useAppointmentsQuery.hook';

import { APPOINTMENT_STATUS } from 'shared/src/utils/constants';
import UserAppointmentsSkeleton from './UserAppointmentsSkeleton';

const UserAppointments = ({ selectedStatus }) => {
    const { data: appointments, isLoading } = useAppointmentsQuery();
    const filteredAppointments = useMemo(() => {
        if (selectedStatus === APPOINTMENT_STATUS.PLANNED) {
            return appointments?.data?.filter(
                (appointment) => appointment.status === APPOINTMENT_STATUS.PLANNED,
            );
        }
        return appointments?.data?.filter((appointment) => {
            return appointment.status !== APPOINTMENT_STATUS.PLANNED;
        });
    }, [appointments, selectedStatus]);

    if (isLoading) return <UserAppointmentsSkeleton />;

    return <UserAppointmentsList appointments={filteredAppointments || []} />;
};

export default UserAppointments;
