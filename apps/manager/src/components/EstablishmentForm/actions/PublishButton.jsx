import Button from 'shared/src/components/Button';
import { FormattedMessage } from 'react-intl';

const PublishButton = () => {
    return (
        <Button>
            <FormattedMessage defaultMessage="Publier" />
        </Button>
    );
};

export default PublishButton;
