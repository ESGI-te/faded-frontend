import { useState } from 'react';
import UserAppointments from '@components/UserAppointments';
import { APPOINTMENT_STATUS } from 'shared/src/utils/constants';
import styled from 'styled-components';
import UserAppointmentsTabs from '@components/UserAppointmentsTabs';
import Stack from 'shared/src/components/Stack';

const UserAppointmentsPage = () => {
    const [selectedStatus, setSelectedStatus] = useState(APPOINTMENT_STATUS.PLANNED);
    return (
        <Stack gap="1rem">
            <StickyContainer>
                <UserAppointmentsTabs
                    onChangeSelectedStatus={setSelectedStatus}
                    activeTab={selectedStatus}
                />
            </StickyContainer>
            <UserAppointments selectedStatus={selectedStatus} />
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

export default UserAppointmentsPage;
