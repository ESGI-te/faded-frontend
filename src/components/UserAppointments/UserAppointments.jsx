import { useMemo, useState } from 'react';
import UserAppointmentsList from '@components/UserAppointmentsList';
import useAppointmentsQuery from '@queries/appointment/useAppointementsQuery.hook';
import { APPOINTMENT_STATUS } from '@utils/constants';
import UserAppointmentsTabs from '@components/UserAppointmentsTabs';
import Stack from '@components/Stack';
import UserAppointmentsSkeleton from './UserAppointmentsSkeleton';
import styled from 'styled-components';

const UserAppointments = () => {
    const { data: appointments, isLoading } = useAppointmentsQuery();
    const [selectedStatus, setSelectedStatus] = useState(APPOINTMENT_STATUS.PLANNED);
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

    return (
        <Stack gap="1rem">
            <StickyContainer>
                <UserAppointmentsTabs
                    onChangeSelectedStatus={setSelectedStatus}
                    activeTab={selectedStatus}
                />
            </StickyContainer>
            <UserAppointmentsList appointments={filteredAppointments} />
        </Stack>
    );
};

const StickyContainer = styled.div`
    position: sticky;
    top: 56px;
    z-index: 1;
    background-color: var(--background);

    ${({ theme }) => theme.mediaQueries.desktopAndUp} {
        top: var(--container-padding);
    }
`;

export default UserAppointments;
