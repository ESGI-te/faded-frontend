import { useState } from 'react';
import PropTypes from 'prop-types';
import TableMenu from 'shared/src/components/TableMenu';
import MenuDropdownItem from 'shared/src/components/MenuDropdown/MenuDropdownItem';
import Text from 'shared/src/components/Text';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';
import ApproveProviderRequestModal from './ApproveProviderRequestModal';
import RejectProviderRequestModal from './RejectProviderRequestModal';
import { PROVIDER_REQUEST_STATUS } from '@utils/constants';
import useUpdateProviderRequestMutation from '@queries/providerRequest/useUpdateProviderRequestMutation.hook';

const MENU_ACTIONS = {
    COMPLETE: 'approve',
    CANCEL: 'reject',
};

const ProviderRequestsTableMenu = ({ request }) => {
    const [isApproveModalOpen, setIsApproveModalOpen] = useState(false);
    const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const updateProviderRequest = useUpdateProviderRequestMutation();

    const handleApprove = () => {
        updateProviderRequest.mutate(
            {
                providerRequestId: request.id,
                providerRequest: { status: PROVIDER_REQUEST_STATUS.APPROVED },
            },
            {
                onSuccess: () => {
                    setIsApproveModalOpen(false);
                },
            },
        );
    };

    const handleReject = () => {
        updateProviderRequest.mutate(
            {
                providerRequestId: request.id,
                providerRequest: { status: PROVIDER_REQUEST_STATUS.REJECTED },
            },
            {
                onSuccess: () => {
                    setIsRejectModalOpen(false);
                },
            },
        );
    };

    const menuActionHandler = (action) => {
        switch (action) {
            case MENU_ACTIONS.COMPLETE:
                setIsApproveModalOpen(true);
                setIsMenuOpen(false);
                return;
            case MENU_ACTIONS.CANCEL:
                setIsRejectModalOpen(true);
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
                <MenuDropdownItem id="approve">
                    <MenuItemIcon icon={icon({ name: 'circle-check', style: 'solid' })} />
                    <Text variant="bodyM">Confirmer</Text>
                </MenuDropdownItem>
                <MenuDropdownItem id="reject">
                    <RejectIcon icon={icon({ name: 'circle-xmark', style: 'solid' })} />
                    <Text variant="bodyM" color="--alert">
                        Annuler
                    </Text>
                </MenuDropdownItem>
            </TableMenu>
            <ApproveProviderRequestModal
                onApprove={handleApprove}
                isOpen={isApproveModalOpen}
                onOpenChange={setIsApproveModalOpen}
                request={request}
            />
            <RejectProviderRequestModal
                isOpen={isRejectModalOpen}
                onOpenChange={setIsRejectModalOpen}
                onReject={handleReject}
                isLoading={updateProviderRequest.isLoading}
                request={request}
            />
        </>
    );
};

const MenuItemIcon = styled(FontAwesomeIcon)`
    width: 0.75rem;
    height: 0.75rem;
`;
const RejectIcon = styled(MenuItemIcon)`
    color: var(--alert);
`;

ProviderRequestsTableMenu.propTypes = {
    request: PropTypes.object.isRequired,
};

export default ProviderRequestsTableMenu;
