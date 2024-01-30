import Stack from 'shared/src/components/Stack';
import { FormattedMessage } from 'react-intl';
import { useFieldArray, useFormContext } from 'react-hook-form';
import EstablishmentFormAccordionNextStepButton from '../EstablishmentFormAccordion/EstablishmentFormAccordionNextStepButton';
import Text from 'shared/src/components/Text';
import styled from 'styled-components';
import useServiceCategoriesQuery from 'shared/src/queries/serviceCategory/useServiceCategoriesQuery.hook';
import Button from 'shared/src/components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';
import EstablishmentFormServicesAddModal from './EstablishmentFormServicesAddModal';
import { useState } from 'react';
import IconButton from 'shared/src/components/IconButton';

const EstablishmentFormServices = () => {
    const { control } = useFormContext();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { append, remove, update, fields } = useFieldArray({ control, name: 'services' });
    const [editedServiceIndex, setEditedServiceIndex] = useState(null);
    const categories = useServiceCategoriesQuery();

    const handleEditService = (index) => {
        setEditedServiceIndex(index);
        setIsModalOpen(true);
    };

    const handleSubmitService = (service) => {
        if (editedServiceIndex === null) {
            append(service);
        } else {
            update(editedServiceIndex, service);
        }

        setIsModalOpen(false);
    };

    return (
        <>
            <Stack gap="1.5rem">
                {fields.length === 0 ? (
                    <EmptyStateWrapper>
                        <Text fontWeight="--fw-semibold">
                            <FormattedMessage defaultMessage="Faites briller votre salon ! Ajoutez vos services ici, qu'il s'agisse de coupes tendance ou de soins exclusifs. C'est simple, cliquez sur 'Ajouter une prestation' et lancez-vous ! 🤩" />
                        </Text>
                        <EmptyStateButton
                            onPress={() => setIsModalOpen(true)}
                            startIcon={
                                <AddIcon
                                    icon={icon({
                                        name: 'add',
                                        style: 'solid',
                                    })}
                                />
                            }
                        >
                            <FormattedMessage defaultMessage="Ajouter une prestation" />
                        </EmptyStateButton>
                    </EmptyStateWrapper>
                ) : (
                    <Button
                        onPress={() => setIsModalOpen(true)}
                        variant="ghost"
                        color="--primary"
                        startIcon={
                            <AddIcon
                                icon={icon({
                                    name: 'add',
                                    style: 'solid',
                                })}
                            />
                        }
                    >
                        <FormattedMessage defaultMessage="Ajouter un service" />
                    </Button>
                )}
                {fields.map((field, index) => (
                    <ServiceWrapper key={index}>
                        <Service>
                            <ServiceInner>
                                <TextEllipsis variant="bodyS" color="--neutral500">
                                    {
                                        categories.data?.data.find((c) => c.id === field.category)
                                            ?.name
                                    }
                                </TextEllipsis>
                                <ServiceInsights>
                                    <Text variant="bodyS" color="--neutral500">
                                        {field.duration}€
                                    </Text>
                                    <Text variant="bodyS" color="--neutral500">
                                        {field.price}min
                                    </Text>
                                </ServiceInsights>
                            </ServiceInner>
                            <TextEllipsis fontWeight="--fw-semibold">{field.name}</TextEllipsis>
                        </Service>
                        <Divider />
                        <ServiceActionWrapper>
                            <ServiceActionButton
                                onPress={() => handleEditService(index)}
                                variant="ghost"
                                icon={
                                    <ServiceActionIcon
                                        icon={icon({ name: 'pen', style: 'solid' })}
                                    />
                                }
                            />
                            <ServiceActionButton
                                onPress={() => remove(index)}
                                variant="ghost"
                                icon={
                                    <ServiceActionTrashIcon
                                        icon={icon({ name: 'trash', style: 'solid' })}
                                    />
                                }
                            />
                        </ServiceActionWrapper>
                    </ServiceWrapper>
                ))}
                {fields.length > 1 && <EstablishmentFormAccordionNextStepButton />}
            </Stack>
            <EstablishmentFormServicesAddModal
                isOpen={isModalOpen}
                onOpenChange={setIsModalOpen}
                onSubmit={handleSubmitService}
                editedService={fields[editedServiceIndex]}
            />
        </>
    );
};

const EmptyStateWrapper = styled.div`
    width: 100%;
    border-radius: var(--r-m);
    background-color: var(--primary50);
    padding: 1rem;
    display: flex;
    flex-direction: column;
    row-gap: 1.5rem;
`;
// const EmptyStateAddButton = styled(Button)`
//     color: var(--primary);
// `;
const AddIcon = styled(FontAwesomeIcon)`
    width: 0.75rem;
    height: 0.75rem;
`;
const ServiceWrapper = styled.div`
    display: flex;
    align-items: center;
    column-gap: 0.5rem;
    border-radius: var(--r-m);
    padding: 0.75rem;
    background-color: var(--neutral50);
`;
const Service = styled.div`
    display: flex;
    flex-direction: column;

    flex-grow: 1;
`;
const ServiceInner = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;
const TextEllipsis = styled(Text)`
    flex-grow: 1;
    min-width: 0;
`;
const ServiceInsights = styled.div`
    display: flex;
    align-items: center;
    flex-shrink: 0;
    column-gap: 1rem;
    padding-right: 0.5rem;
`;
const ServiceActionIcon = styled(FontAwesomeIcon)`
    width: 0.75rem;
    height: 0.75rem;
    color: var(--neutral300);
`;
const ServiceActionTrashIcon = styled(ServiceActionIcon)`
    color: var(--alert);
`;
const ServiceActionWrapper = styled.div`
    display: flex;
    flex-shrink: 0;
`;
const ServiceActionButton = styled(IconButton)`
    border-radius: var(--r-full);
    &[data-hovered] {
        background-color: var(--neutral100);
    }
`;
const Divider = styled.div`
    width: 2px;
    align-self: stretch;
    background-color: var(--neutral100);
    flex-shrink: 0;
`;
const EmptyStateButton = styled(Button)`
    ${({ theme }) => theme.mediaQueries.desktopAndUp} {
        width: fit-content;
    }
`;

export default EstablishmentFormServices;
