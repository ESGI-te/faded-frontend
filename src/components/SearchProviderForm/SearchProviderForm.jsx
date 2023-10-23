import { useForm } from 'react-hook-form';
import { searchProviderFormSchema } from './SearchProviderForm.schema';
import { yupResolver } from '@hookform/resolvers/yup';
import styled from 'styled-components';
import Button from '@components/Button';
import PropTypes from 'prop-types';
import { InputTextController } from '@components/InputText';
import { FormattedMessage, useIntl } from 'react-intl';

const SearchProviderForm = ({ onSubmit, isLoading }) => {
    const intl = useIntl();
    const { control, handleSubmit, formState } = useForm({
        mode: 'onBlur',
        resolver: yupResolver(searchProviderFormSchema),
        defaultValues: {
            providerName: '',
        },
    });
    const { isDirty } = formState;

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <InputTextController
                control={control}
                name="providerName"
                placeholder={intl.formatMessage({ defaultMessage: "Recherche d'établissement" })}
                label={<FormattedMessage defaultMessage="Nom de l'établissement" />}
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

SearchProviderForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    isLoading: PropTypes.bool,
};

SearchProviderForm.defaultProps = {
    onSubmit: () => {},
    isLoading: false,
};

export default SearchProviderForm;
