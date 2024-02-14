import EstablishmentSchedulesForm from '@components/EstablishmentSchedulesForm';
import useUpdateEstablishmentMutation from '@queries/establishment/useUpdateEstablishmentMutation.hook';
import useEstablishmentQuery from 'shared/src/queries/establishment/useEstablishmentQuery.hook';
import { useParams } from 'react-router-dom';
import { useIntl } from 'react-intl';
import { toast } from 'react-toastify';

const EstablishmentSchedules = () => {
    const { establishmentId } = useParams();
    const { data: establishment, isLoading } = useEstablishmentQuery(establishmentId);
    const updateEstablishment = useUpdateEstablishmentMutation();
    const intl = useIntl();

    const handleEstablishmentSchedules = (data) => {
        updateEstablishment.mutate(
            {
                establishmentId,
                establishment: data,
            },
            {
                onSuccess: () => {
                    toast.success(
                        intl.formatMessage({
                            defaultMessage: 'Vos informations ont bien été mises à jour',
                        }),
                    );
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
