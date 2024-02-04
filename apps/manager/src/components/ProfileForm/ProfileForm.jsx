import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import styled from 'styled-components';
import Button from 'shared/src/components/Button';
import PropTypes from 'prop-types';
import InputText, { InputTextController } from 'shared/src/components/InputText';
import { FormattedMessage, useIntl } from 'react-intl';
import useProfileFormSchema from './useProfileFormSchema.hook';
import { InputSelectController } from 'shared/src/components/InputSelect';
import { LOCALES } from '@contexts/IntlProvider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { icon as icon } from '@fortawesome/fontawesome-svg-core/import.macro';
import { useState } from 'react';
import EditEmailModal from './EditEmailModal';
import EditPasswordModal from './EditPasswordModal';

const EditButton = (props) => (
    <EditGhostButton
        {...props}
        startIcon={<EditIcon icon={icon({ name: 'pen', style: 'solid' })} />}
        variant="ghost"
    >
        <FormattedMessage defaultMessage="Modifier" />
    </EditGhostButton>
);

const ProfileForm = ({ user, onSubmit, isLoading }) => {
    const schema = useProfileFormSchema();
    const { control, handleSubmit, formState } = useForm({
        mode: 'onBlur',
        resolver: yupResolver(schema),
        defaultValues: {
            firstName: user?.firstName,
            lastName: user?.lastName,
            locale: user?.locale,
        },
    });
    const { isDirty } = formState;
    const intl = useIntl();
    const localeItems = Object.values(LOCALES).map((locale) => ({
        name: locale.toUpperCase(),
        id: locale,
    }));
    const [isEditEmailModalOpen, setIsEditEmailModalOpen] = useState(false);
    const [isEditPasswordModalOpen, setIsEditPasswordModalOpen] = useState(false);

    return (
        <>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <ResponsiveWrapper>
                    <InputTextController
                        control={control}
                        name="lastName"
                        placeholder={intl.formatMessage({ defaultMessage: 'Nom' })}
                        label={<FormattedMessage defaultMessage="Nom" />}
                    />
                    <InputTextController
                        control={control}
                        name="firstName"
                        placeholder={intl.formatMessage({ defaultMessage: 'Prénom' })}
                        label={<FormattedMessage defaultMessage="Prénom" />}
                    />
                </ResponsiveWrapper>
                <InputSelectController
                    control={control}
                    name="locale"
                    label={<FormattedMessage defaultMessage="Langue" />}
                    items={localeItems}
                />
                <InputText
                    defaultValue={user?.email}
                    name="email"
                    placeholder="Email"
                    label="Email"
                    type="email"
                    isDisabled
                    customButton={<EditButton onPress={() => setIsEditEmailModalOpen(true)} />}
                />
                <InputText
                    defaultValue={user?.password}
                    name="password"
                    type="password"
                    label={<FormattedMessage defaultMessage="Mot de passe" />}
                    placeholder="******"
                    isDisabled
                    customButton={<EditButton onPress={() => setIsEditPasswordModalOpen(true)} />}
                />
                <SubmitButton isDisabled={!isDirty} isLoading={isLoading} type="submit">
                    <FormattedMessage defaultMessage="Enregistrer" />
                </SubmitButton>
            </Form>
            <EditEmailModal
                user={user}
                isOpen={isEditEmailModalOpen}
                onOpenChange={setIsEditEmailModalOpen}
            />
            <EditPasswordModal
                userId={user?.id}
                isOpen={isEditPasswordModalOpen}
                onOpenChange={setIsEditPasswordModalOpen}
            />
        </>
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

    ${({ theme }) => theme.mediaQueries.desktopAndUp} {
        align-self: center;
    }
`;
const EditIcon = styled(FontAwesomeIcon)`
    font-size: 0.75rem;
    color: var(--primary500);
`;
const EditGhostButton = styled(Button)`
    color: var(--primary500);
    font-size: var(--fs-body-m);
`;
const ResponsiveWrapper = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 2rem;

    ${({ theme }) => theme.mediaQueries.desktopAndUp} {
        flex-direction: row;
        column-gap: 2rem;

        & > * {
            flex: 1;
        }
    }
`;

ProfileForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    isLoading: PropTypes.bool,
    user: PropTypes.object.isRequired,
};

ProfileForm.defaultProps = {
    onSubmit: () => {},
    isLoading: false,
};

export default ProfileForm;
