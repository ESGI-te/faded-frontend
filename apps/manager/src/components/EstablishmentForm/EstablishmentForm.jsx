import styled from 'styled-components';
import EstablishmentFormContent from './EstablishmentFormContent';
import { useEstablishmentBeingEdited } from './EstablishmentFormProvider';
import { ESTABLISHMENT_STATUS } from 'shared/src/utils/constants';
import SaveDraftAndCloseButton from './actions/SaveDraftAndCloseButton';
import CancelButton from './actions/CancelButton';
import MoveToDraftButton from './actions/MoveToDraftButton';
import useResponsive from 'shared/src/hooks/useResponsive.hook';
import Cluster from 'shared/src/components/Cluster';
import PublishButton from './actions/PublishButton';
import SaveAndCloseButton from './actions/SaveAndCloseButton';
import { useIntl } from 'react-intl';
import getEstablishmentFormSchema from './schemas/establishmentSchema';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import UnsavedFormModal from 'shared/src/components/UnsavedFormModal';

const EstablishmentForm = () => {
    const intl = useIntl();
    const schema = getEstablishmentFormSchema(intl);
    const { isDesktopAndUp } = useResponsive();
    const establishment = useEstablishmentBeingEdited();
    const isDraft = establishment?.status === ESTABLISHMENT_STATUS.DRAFT;

    const methods = useForm({
        mode: 'onBlur',
        defaultValues: {
            information: {
                name: establishment?.name,
                email: establishment?.email,
                phone: establishment?.phone,
                address: establishment?.address,
            },
            planning: establishment?.planning,
            services: establishment?.services,
            barbers: establishment?.barbers,
            images: establishment?.images,
        },
        resolver: yupResolver(schema),
    });

    const {
        formState: { isDirty },
    } = methods;

    return (
        <FormProvider {...methods}>
            <Header>
                <Cluster gap="1rem" $wrap="nowrap">
                    {isDraft ? (
                        <SaveDraftAndCloseButton />
                    ) : (
                        <>
                            <CancelButton />
                            {isDesktopAndUp && <MoveToDraftButton />}
                        </>
                    )}
                </Cluster>
                {isDesktopAndUp && (isDraft ? <PublishButton /> : <SaveAndCloseButton />)}
            </Header>
            <Content>
                <EstablishmentFormContent />
            </Content>
            <Footer>
                {isDraft ? (
                    <PublishButton />
                ) : (
                    <>
                        <MoveToDraftButton />
                        <SaveAndCloseButton />
                    </>
                )}
            </Footer>
            <UnsavedFormModal shouldBlockNavigation={isDirty} />
        </FormProvider>
    );
};

const Header = styled.header`
    display: flex;
    flex-direction: row;
    gap: 1rem;
    justify-content: space-between;
    padding: 1rem;

    ${({ theme }) => theme.mediaQueries.desktopAndUp} {
        padding: 2rem;
    }
`;
const Footer = styled.footer`
    background-color: var(--white);
    border-top: 1px solid var(--neutral100);
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 0.5rem 1rem;
    padding: 1rem;

    > * {
        flex-grow: 1;
    }

    ${({ theme }) => theme.mediaQueries.desktopAndUp} {
        display: none;
    }
`;
const Content = styled.div`
    flex-grow: 1;
    min-height: 0;
    overflow-y: auto;
    padding: 0 1rem 1rem;

    ${({ theme }) => theme.mediaQueries.desktopAndUp} {
        display: flex;
        justify-content: center;
        background-color: var(--neutral50);
        border-radius: var(--r-l) var(--r-l) 0 0;
        margin-inline: 2rem;
        padding: 2rem;
    }
`;

EstablishmentForm.propTypes = {};

export default EstablishmentForm;
