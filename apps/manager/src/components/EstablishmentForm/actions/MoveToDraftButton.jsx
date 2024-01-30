import { FormattedMessage } from 'react-intl';
import Button from 'shared/src/components/Button';

const MoveToDraftButton = () => {
    return (
        <Button variant="secondary">
            <FormattedMessage defaultMessage="Passer en brouillon" />
        </Button>
    );
};

export default MoveToDraftButton;
