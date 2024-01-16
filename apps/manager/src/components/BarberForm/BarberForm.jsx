import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import styled from 'styled-components';
import Button from 'shared/src/components/Button';
import PropTypes from 'prop-types';
import { InputTextController } from 'shared/src/components/InputText';
import { FormattedMessage, useIntl } from 'react-intl';
import useBarberFormSchema from './useBarberFormSchema.hook';
import useEditBarberFormSchema from './useEditBarberFormSchema.hook';

const BarberForm = ({ onSubmit, isLoading, isEdit, defaultValues }) => {
    const intl = useIntl();
    const createSchema = useBarberFormSchema();
    const editSchema = useEditBarberFormSchema();
    const schema = isEdit ? editSchema : createSchema;
    const { control, handleSubmit, formState } = useForm({
        mode: 'onBlur',
        resolver: yupResolver(schema),
        defaultValues,
    });
    const { isDirty } = formState;

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <ResponsiveWrapper>
                <InputTextController
                    control={control}
                    name="firstName"
                    placeholder={intl.formatMessage({ defaultMessage: 'Prénom' })}
                    label={<FormattedMessage defaultMessage="Prénom" />}
                />
                <InputTextController
                    control={control}
                    name="lastName"
                    placeholder={intl.formatMessage({ defaultMessage: 'Nom' })}
                    label={<FormattedMessage defaultMessage="Nom" />}
                />
            </ResponsiveWrapper>
            <InputTextController
                control={control}
                name="email"
                placeholder="Email"
                label="Email"
                type="email"
            />
            <SubmitButton isDisabled={!isDirty} isLoading={isLoading} type="submit">
                {isEdit ? (
                    <FormattedMessage defaultMessage="Modifier" />
                ) : (
                    <FormattedMessage defaultMessage="Ajouter" />
                )}
            </SubmitButton>
        </Form>
    );
};

const Form = styled.form`
    display: flex;
    flex-direction: column;
    row-gap: 1rem;
    width: 100%;

    ${({ theme }) => theme.mediaQueries.desktopAndUp} {
        row-gap: 2rem;
    }
`;
const SubmitButton = styled(Button)`
    margin-top: 1rem;
    align-self: stretch;
    background-color: var(--black);
`;
const ResponsiveWrapper = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 1rem;

    ${({ theme }) => theme.mediaQueries.desktopAndUp} {
        flex-direction: row;
        column-gap: 1rem;
    }
`;

BarberForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    isLoading: PropTypes.bool,
    isEdit: PropTypes.bool,
    defaultValues: PropTypes.object,
};

BarberForm.defaultProps = {
    onSubmit: () => {},
    isLoading: false,
    isEdit: false,
};

export default BarberForm;
