import Button from "@components/Button";
import { APPOINTMENT_STATUS } from "@utils/constants";
import { FormattedMessage } from "react-intl";
import styled, { css } from "styled-components";


const UserAppointmentsTabs = ({ onChangeSelectedStatus, activeTab }) => {
    return (
        <Tabs activeTab={activeTab}>
            <Tab onClick={() => onChangeSelectedStatus(APPOINTMENT_STATUS.PLANNED)}>
                <FormattedMessage defaultMessage="À venir" />
            </Tab>
            <Tab onClick={() => onChangeSelectedStatus(APPOINTMENT_STATUS.FINISHED)}>
                <FormattedMessage defaultMessage="Historique" />
            </Tab>
        </Tabs>
    )
}

const Tabs = styled.div`
    display: flex;
    border-bottom: 2px solid var(--neutral100);
    position: relative;
    width: 100%;

    &::after {
        content: '';
        position: absolute;
        left: 0;
        bottom: -2px;
        width: 50%;
        height: 2px;
        background-color: var(--black);
        transition: 0.25s;

        ${({ activeTab }) =>
        activeTab !== APPOINTMENT_STATUS.PLANNED &&
        css`
                transform: translateX(100%);
            `}
    }

    ${({ theme }) => theme.mediaQueries.desktopAndUp} {
        max-width: 300px;
    }
`;
const Tab = styled(Button)`
    flex: 1;
    color: var(--black);
    padding: 1rem;
    font-size: var(--fs-body);
    font-weight: var(--fw-semibold);
    background: none;
    border: none;
    cursor: pointer;

    &[data-focused] {
        outline: none;
    }

    ${({ isActive }) =>
        isActive &&
        css`
            border-bottom: 2px solid var(--black);
        `}; 

`;

export default UserAppointmentsTabs