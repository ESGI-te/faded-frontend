import { useForm } from 'react-hook-form';
import { HomeSearchEstablishmentsFormSchema } from './HomeSearchEstablishmentsForm.schema';
import { yupResolver } from '@hookform/resolvers/yup';
import styled from 'styled-components';
import Button from '@components/Button';
import PropTypes from 'prop-types';
import { FormattedMessage, useIntl } from 'react-intl';
import InputSearchPlaces from '@components/InputSearchPlaces';
import InputSearchServiceOrProvider from '@components/InputSearchServiceOrProvider';

const HomeSearchEstablishmentsForm = ({ onSubmit }) => {
    const intl = useIntl();
    const { control, handleSubmit, formState } = useForm({
        mode: 'onBlur',
        resolver: yupResolver(HomeSearchEstablishmentsFormSchema),
        defaultValues: {
            serviceCategories: '',
            address: '',
        },
    });
    const { isDirty } = formState;

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <InputSearchServiceOrProvider
                label={<FormattedMessage defaultMessage="Que cherchez-vous ?" />}
                control={control}
                name="serviceCategories"
            />
            <InputSearchPlaces
                label={<FormattedMessage defaultMessage="Où" />}
                control={control}
                name="address"
            />
            <SubmitButton isDisabled={!isDirty} type="submit">
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

HomeSearchEstablishmentsForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    isLoading: PropTypes.bool,
};

HomeSearchEstablishmentsForm.defaultProps = {
    onSubmit: () => {},
    isLoading: false,
};

export default HomeSearchEstablishmentsForm;
