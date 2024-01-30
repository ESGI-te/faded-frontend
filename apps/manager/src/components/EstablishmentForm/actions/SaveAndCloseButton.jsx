import Button from 'shared/src/components/Button';
import { FormattedMessage } from 'react-intl';

const SaveAndCloseButton = () => {
    return (
        <Button>
            <FormattedMessage defaultMessage="Enregistrer" />
        </Button>
    );
};

export default SaveAndCloseButton;
