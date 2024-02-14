import styled from 'styled-components';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from 'shared/src/components/Button';
import { FormattedMessage } from 'react-intl';
import { DialogTrigger } from 'react-aria-components';
import PublishEstablishmentModal from './PublishEstablishmentModal';

const PublishEstablishmentButton = () => {
    return (
        <DialogTrigger>
            <PublishButton
                startIcon={<PublishIcon icon={icon({ name: 'rocket', style: 'solid' })} />}
            >
                <FormattedMessage defaultMessage="Publier" />
            </PublishButton>
            <PublishEstablishmentModal />
        </DialogTrigger>
    );
};

const PublishButton = styled(Button)`
    padding: 0.25rem 0.75rem;
    background-color: var(--primary100);
    color: var(--primary);
    font-size: var(--fs-body-m);
    display: none;

    ${({ theme }) => theme.mediaQueries.desktopAndUp} {
        display: flex;
    }
`;
const PublishIcon = styled(FontAwesomeIcon)`
    width: 0.75rem;
    height: 0.75rem;
    color: var(--primary);
`;

export default PublishEstablishmentButton;
