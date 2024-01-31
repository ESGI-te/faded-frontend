import EstablishmentSchedulesForm from '@components/EstablishmentSchedulesForm';
import useUpdateEstablishmentMutation from '@components/EstablishmentForm/useUpdateEstablishmentMutation.hook';
import useEstablishmentQuery from 'shared/src/queries/establishment/useEstablishmentQuery.hook';
import { useParams } from 'react-router-dom';

const EstablishmentSchedules = () => {
    const { establishmentId } = useParams();
    const { data: establishment, isLoading } = useEstablishmentQuery(establishmentId);
    const updateEstablishment = useUpdateEstablishmentMutation();

    const handleEstablishmentSchedules = (data) => {
        updateEstablishment.mutate(
            {
                establishmentId,
                establishment: data,
            },
            {
                onSuccess: () => {
                    // TODO: show success toast
                },
            },
        );
    };

    if (isLoading) return <div>Loading...</div>;

    return (
        <EstablishmentSchedulesForm
            onSubmit={handleEstablishmentSchedules}
            isLoading={updateEstablishment.isLoading}
            planning={establishment?.planning}
        />
    );
};

export default EstablishmentSchedules;
