import { useIntl } from 'react-intl';

const useEstablishmentPublishQuestSteps = (establishment) => {
    const intl = useIntl();

    const steps = [
        {
            check: establishment?.barbers?.length > 0,
            message: intl.formatMessage({
                defaultMessage: 'Ajoutez au moins un coiffeur à votre établissement.',
            }),
            link: `/${establishment?.id}/team`,
        },
        {
            check: establishment?.services?.length > 0,
            message: intl.formatMessage({
                defaultMessage: 'Ajoutez au moins une prestation proposée par votre établissement.',
            }),
            link: `/${establishment?.id}/services`,
        },
        {
            check: Object.values(establishment?.planning || {}).some((day) => day.isOpen === true),
            message: intl.formatMessage({
                defaultMessage: "Définissez les horaires d'ouverture de votre établissement.",
            }),
            link: `/${establishment?.id}/schedules`,
        },
        {
            check: establishment?.address,
            message: intl.formatMessage({
                defaultMessage: "Renseignez l'adresse de votre établissement.",
            }),
            link: `/${establishment?.id}/settings`,
        },
        {
            check: establishment?.email,
            message: intl.formatMessage({
                defaultMessage: 'Ajoutez un email de contact pour votre établissement.',
            }),
            link: `/${establishment?.id}/settings`,
        },
        {
            check: establishment?.cover,
            message: intl.formatMessage({
                defaultMessage: 'Ajoutez une image de couverture pour votre établissement.',
            }),
            link: `/${establishment?.id}/settings`,
        },
    ];

    return steps;
};

export default useEstablishmentPublishQuestSteps;
