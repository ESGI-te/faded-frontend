import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FormattedMessage, useIntl } from 'react-intl';
import { InputTextController } from 'shared/src/components/InputText';
import { ComboBoxController } from 'shared/src/components/ComboBox';
import useServiceCategoriesQuery from 'shared/src/queries/serviceCategory/useServiceCategoriesQuery.hook';
import ListBoxItem from 'shared/src/components/ListBoxItem';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { getEstablishmentServiceSchema } from './establishmentServiceSchema';
import Button from 'shared/src/components/Button';

const EstablishmentFormServicesAdd = ({ onSubmit, editedService, onClose }) => {
    const categories = useServiceCategoriesQuery();
    const intl = useIntl();
    const schema = getEstablishmentServiceSchema(intl);
    const { control, handleSubmit, formState } = useForm({
        mode: 'onBlur',
        resolver: yupResolver(schema),
        defaultValues: editedService || {
            name: '',
            category: '',
            duration: 30,
            price: 0,
        },
    });
    const { isDirty } = formState;

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
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
                    isRequired
                />
            </ResponsiveWrapper>
            <ActionsWrapper>
                <SubmitButton isDisabled={!isDirty} type="submit">
                    {editedService ? (
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
    editedService: PropTypes.object,
    onClose: PropTypes.func,
};

EstablishmentFormServicesAdd.defaultProps = {
    onSubmit: () => {},
    onClose: () => {},
};

export default EstablishmentFormServicesAdd;
