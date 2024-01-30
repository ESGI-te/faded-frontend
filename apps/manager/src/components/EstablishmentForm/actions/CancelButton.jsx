import Button from 'shared/src/components/Button';
import { FormattedMessage } from 'react-intl';
import { useNavigate } from 'react-router-dom';

const CancelButton = () => {
    const navigate = useNavigate();

    return (
        <Button onPress={() => navigate(-1)} variant="secondary">
            <FormattedMessage defaultMessage="Annuler" />
        </Button>
    );
};

export default CancelButton;
