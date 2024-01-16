import { useState } from 'react';
import PropTypes from 'prop-types';
import TableMenu from 'shared/src/components/TableMenu';
import MenuDropdownItem from 'shared/src/components/MenuDropdown/MenuDropdownItem';
import Text from 'shared/src/components/Text';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';
import CompleteAppointmentModal from '@components/CompleteAppointmentModal';
import CancelAppointmentModal from '@components/CancelAppointmentModal';
import useCancelAppointmentMutation from 'shared/src/queries/appointment/useCancelAppointmentMutation.hook';

const MENU_ACTIONS = {
    COMPLETE: 'complete',
    CANCEL: 'cancel',
};

const AppointmentsTableMenu = ({ appointment }) => {
    const [isCompleteModalOpen, setIsCompleteModalOpen] = useState(false);
    const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const cancelAppointment = useCancelAppointmentMutation();

    const handleCancel = () => {
        cancelAppointment.mutate(
            {
                appointmentId: appointment.id,
                dateTime: appointment.dateTime,
            },
            {
                onSuccess: () => {
                    setIsCancelModalOpen(false);
                },
            },
        );
    };

    const menuActionHandler = (action) => {
        switch (action) {
            case MENU_ACTIONS.COMPLETE:
                setIsCompleteModalOpen(true);
                setIsMenuOpen(false);
                return;
            case MENU_ACTIONS.CANCEL:
                setIsCancelModalOpen(true);
                setIsMenuOpen(false);
                return;
            default:
                return;
        }
    };

    return (
        <>
            <TableMenu
                onAction={menuActionHandler}
                isOpen={isMenuOpen}
                onOpenChange={setIsMenuOpen}
            >
                <MenuDropdownItem id="complete">
                    <MenuItemIcon icon={icon({ name: 'circle-check', style: 'solid' })} />
                    <Text variant="bodyM">Confirmer</Text>
                </MenuDropdownItem>
                <MenuDropdownItem id="cancel">
                    <CancelIcon icon={icon({ name: 'circle-xmark', style: 'solid' })} />
                    <Text variant="bodyM" color="--alert">
                        Annuler
                    </Text>
                </MenuDropdownItem>
            </TableMenu>
            <CompleteAppointmentModal
                isOpen={isCompleteModalOpen}
                onOpenChange={setIsCompleteModalOpen}
                appointment={appointment}
            />
            <CancelAppointmentModal
                isOpen={isCancelModalOpen}
                onOpenChange={setIsCancelModalOpen}
                onCancel={handleCancel}
                isLoading={cancelAppointment.isLoading}
                appointment={appointment}
            />
        </>
    );
};

const MenuItemIcon = styled(FontAwesomeIcon)`
    width: 0.75rem;
    height: 0.75rem;
`;
const CancelIcon = styled(MenuItemIcon)`
    color: var(--alert);
`;

AppointmentsTableMenu.propTypes = {
    appointment: PropTypes.object.isRequired,
};

export default AppointmentsTableMenu;
