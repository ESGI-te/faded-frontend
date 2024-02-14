import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';
import Button from 'shared/src/components/Button';
import { DialogTrigger } from 'react-aria-components';
import { FormattedMessage } from 'react-intl';
import MoveToDraftEstablishmentModal from './MoveToDraftEstablishmentModal';

const MoveToDraftEstablishmentButton = () => {
    return (
        <DialogTrigger>
            <MoveToDraftButton
                startIcon={<MoveToDraftIcon icon={icon({ name: 'reply', style: 'solid' })} />}
            >
                <FormattedMessage defaultMessage="Depl. Brouillon" />
            </MoveToDraftButton>
            <MoveToDraftEstablishmentModal />
        </DialogTrigger>
    );
};

const MoveToDraftButton = styled(Button)`
    padding: 0.25rem 0.75rem;
    background-color: var(--neutral100);
    /* border: 1px solid var(--neutral200); */
    color: var(--neutral500);
    font-size: var(--fs-body-m);
    display: none;

    ${({ theme }) => theme.mediaQueries.desktopAndUp} {
        display: flex;
    }
`;
const MoveToDraftIcon = styled(FontAwesomeIcon)`
    width: 0.75rem;
    height: 0.75rem;
    color: var(--neutral500);
`;

export default MoveToDraftEstablishmentButton;
