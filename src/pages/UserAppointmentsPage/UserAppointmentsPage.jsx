import UserAppointments from '@components/UserAppointments';
import styled from 'styled-components'

const UserAppointmentsPage = () => {
  return (
    <Page>
        <PageInnerWrapper>
            <UserAppointments/>
        </PageInnerWrapper>
    </Page>
  )
}

const Page = styled.section`
    min-height: 100%;
    width: 100%;
    display: flex;
    align-items: start;
    background-color: var(--neutral50);

    ${({ theme }) => theme.mediaQueries.desktopAndUp} {
        justify-content: center;
    }
`;
const PageInnerWrapper = styled.div`
    width: 100%;
    align-self: stretch;
    max-width: 900px;
    display: flex;
    flex-direction: column;
    row-gap: 1rem;
    background-color: var(--neutral50);
    padding: var(--container-padding-mobile);

    ${({ theme }) => theme.mediaQueries.desktopAndUp} {
        row-gap: 2rem;
        padding: var(--container-padding);
    }
`;

export default UserAppointmentsPage