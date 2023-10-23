import { useForm } from 'react-hook-form';
import { searchServiceFormSchema } from './SearchServiceForm.schema';
import { yupResolver } from '@hookform/resolvers/yup';
import styled from 'styled-components';
import Button from '@components/Button';
import PropTypes from 'prop-types';
import { InputTextController } from '@components/InputText';
import { FormattedMessage, useIntl } from 'react-intl';

const SearchServiceForm = ({ onSubmit, isLoading }) => {
    const intl = useIntl();
    const { control, handleSubmit, formState } = useForm({
        mode: 'onBlur',
        resolver: yupResolver(searchServiceFormSchema),
        defaultValues: {
            service: '',
            localisation: '',
        },
    });
    const { isDirty } = formState;

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <InputTextController
                control={control}
                name="service"
                placeholder={intl.formatMessage({ defaultMessage: 'Coupe & Coiffage' })}
                label={<FormattedMessage defaultMessage="Prestation" />}
            />
            <InputTextController
                control={control}
                name="localisation"
                label={<FormattedMessage defaultMessage="Localisation" />}
                placeholder={intl.formatMessage({ defaultMessage: 'Paris' })}
            />
            <SubmitButton isDisabled={!isDirty} isLoading={isLoading} type="submit">
                <FormattedMessage defaultMessage="Rechercher" />
            </SubmitButton>
        </Form>
    );
};

const Form = styled.form`
    display: flex;
    flex-direction: column;
    row-gap: 1rem;
    width: 100%;
`;
const SubmitButton = styled(Button)`
    margin-top: 1rem;
    align-self: stretch;
    background-color: var(--black);
`;

SearchServiceForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    isLoading: PropTypes.bool,
};

SearchServiceForm.defaultProps = {
    onSubmit: () => {},
    isLoading: false,
};

export default SearchServiceForm;
