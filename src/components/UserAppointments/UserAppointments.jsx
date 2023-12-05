import { useState } from 'react';
import UserAppointmentsList from '@components/UserAppointmentsList';
import useAppointmentsQuery from '@queries/appointment/useAppointementsQuery.hook';
import { APPOINTMENT_STATUS } from '@utils/constants';
import UserAppointmentsTabs from '@components/UserAppointmentsTabs';
import Stack from '@components/Stack';

const UserAppointments = () => {
  const { data: appointments, isLoading } = useAppointmentsQuery();
  const [selectedStatus, setSelectedStatus] = useState(APPOINTMENT_STATUS.PLANNED);
  const filteredAppointments = appointments?.data?.filter((appointment) => {
    if (appointment.status === APPOINTMENT_STATUS.PLANNED) {
      return appointment.status === selectedStatus;
    }
    return appointment.status !== selectedStatus;
  });

  if (isLoading) return <div>Loading...</div>; // TODO: Add skeleton

  return (
    <Stack gap="1rem">
      <UserAppointmentsTabs onChangeSelectedStatus={setSelectedStatus} activeTab={selectedStatus} />
      <UserAppointmentsList appointments={filteredAppointments} />
    </Stack>
  );
};

export default UserAppointments;
