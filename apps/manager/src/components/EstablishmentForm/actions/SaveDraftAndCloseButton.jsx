import Button from 'shared/src/components/Button';
import { FormattedMessage } from 'react-intl';

const SaveDraftAndCloseButton = () => {
    return (
        <Button variant="secondary">
            <FormattedMessage defaultMessage="Enregistrer et fermer" />
        </Button>
    );
};

export default SaveDraftAndCloseButton;
