import { useForm } from 'react-hook-form';
import { searchEstablishmentsSchema } from './SearchEstablishmentsForm.schema';
import { yupResolver } from '@hookform/resolvers/yup';
import styled from 'styled-components';
import Button from '@components/Button';
import PropTypes from 'prop-types';
import { FormattedMessage, useIntl } from 'react-intl';
import InputSearchPlaces from '@components/InputSearchPlaces';
import InputSearchServiceOrProvider from '@components/InputSearchServiceOrProvider';

const SearchEstablishments = ({ onSubmit, isLoading }) => {
    const intl = useIntl();
    const { control, handleSubmit, formState } = useForm({
        mode: 'onBlur',
        resolver: yupResolver(searchEstablishmentsSchema),
        defaultValues: {
            categoryId: '',
            address: '',
            radius: 250000,
        },
    });
    const { isDirty } = formState;

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <InputSearchServiceOrProvider
                label={<FormattedMessage defaultMessage="Que cherchez-vous ?" />}
                control={control}
                name="categoryId"
            />
            <InputSearchPlaces
                label={<FormattedMessage defaultMessage="Où" />}
                control={control}
                name="address"
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

SearchEstablishments.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    isLoading: PropTypes.bool,
};

SearchEstablishments.defaultProps = {
    onSubmit: () => {},
    isLoading: false,
};

export default SearchEstablishments;
