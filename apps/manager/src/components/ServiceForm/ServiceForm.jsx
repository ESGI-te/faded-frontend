import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FormattedMessage, useIntl } from 'react-intl';
import { InputTextController } from 'shared/src/components/InputText';
import { ComboBoxController } from 'shared/src/components/ComboBox';
import useServiceCategoriesQuery from 'shared/src/queries/serviceCategory/useServiceCategoriesQuery.hook';
import ListBoxItem from 'shared/src/components/ListBoxItem';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Button from 'shared/src/components/Button';
import useServiceFormSchema from './useServiceFormSchema.hook';

const getDefaultValues = (service) => {
    if (!service) {
        return {
            name: '',
            category: '',
            duration: 30,
            price: 5,
        };
    }

    return {
        name: service.name,
        category: service.category.id,
        duration: service.duration,
        price: service.price,
    };
};

const EstablishmentFormServicesAdd = ({ onSubmit, service, onClose, isLoading }) => {
    const categories = useServiceCategoriesQuery();
    const intl = useIntl();
    const schema = useServiceFormSchema();
    const { control, handleSubmit, formState } = useForm({
        mode: 'onBlur',
        resolver: yupResolver(schema),
        defaultValues: getDefaultValues(service),
    });
    const { isDirty } = formState;

    const submit = (data) => {
        if (service) {
            onSubmit(service.id, data);
            return;
        }
        onSubmit(data);
    };

    return (
        <Form onSubmit={handleSubmit(submit)}>
            <ResponsiveWrapper>
                <InputTextController
                    name="name"
                    control={control}
                    label={<FormattedMessage defaultMessage="Prestation" />}
                    placeholder={intl.formatMessage({
                        defaultMessage: 'Nom de la prestation',
                    })}
                    isRequired
                />
                <ComboBoxController
                    control={control}
                    name="category"
                    label={<FormattedMessage defaultMessage="Catégorie" />}
                    isLoading={categories.isFetching}
                    defaultItems={categories?.data?.data}
                >
                    {(item) => <ListBoxItem {...item} />}
                </ComboBoxController>
            </ResponsiveWrapper>
            <ResponsiveWrapper>
                <InputTextController
                    name="duration"
                    control={control}
                    label={<FormattedMessage defaultMessage="Durée" />}
                    placeholder={intl.formatMessage({
                        defaultMessage: 'Durée de la prestation',
                    })}
                    type="number"
                    min="1"
                    isRequired
                />
                <InputTextController
                    name="price"
                    control={control}
                    label={<FormattedMessage defaultMessage="Prix" />}
                    placeholder={intl.formatMessage({
                        defaultMessage: 'Prix de la prestation',
                    })}
                    type="number"
                    step="0.01"
                    min="1"
                    isRequired
                />
            </ResponsiveWrapper>
            <ActionsWrapper>
                <SubmitButton isLoading={isLoading} isDisabled={!isDirty} type="submit">
                    {service ? (
                        <FormattedMessage defaultMessage="Modifier" />
                    ) : (
                        <FormattedMessage defaultMessage="Ajouter" />
                    )}
                </SubmitButton>
                <Button variant="secondary" onPress={onClose}>
                    <FormattedMessage defaultMessage="Annuler" />
                </Button>
            </ActionsWrapper>
        </Form>
    );
};

const Form = styled.form`
    display: flex;
    flex-direction: column;
    row-gap: 1rem;
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
const SubmitButton = styled(Button)`
    background-color: var(--black);
`;
const ActionsWrapper = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 1rem;
    align-items: stretch;
    margin-top: 1rem;

    ${({ theme }) => theme.mediaQueries.desktopAndUp} {
        flex-direction: row;
        align-items: center;
        column-gap: 1rem;
        justify-content: end;
        margin-top: 2rem;

        & > :first-child {
            order: 1;
        }
    }
`;

EstablishmentFormServicesAdd.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    service: PropTypes.object,
    onClose: PropTypes.func,
    isLoading: PropTypes.bool,
};

EstablishmentFormServicesAdd.defaultProps = {
    onSubmit: () => {},
    onClose: () => {},
    isLoading: false,
};

export default EstablishmentFormServicesAdd;
