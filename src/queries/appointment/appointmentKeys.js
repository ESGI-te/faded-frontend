const appointmentKeys = {
    all: () => [{ entity: 'appointment' }],
    allLists: () => [{ ...appointmentKeys.all()[0], scope: 'list' }],
    list: ({ page, perPage, ...q } = {}) => [
        { ...appointmentKeys.allLists()[0], ...q, page, perPage },
    ],
    listByEstablishmentId: (establishmentId, { page, perPage, ...q } = {}) => [
        {
            ...appointmentKeys.allLists()[0],
            ...q,
            establishmentId,
            page,
            perPage,
        },
    ],
    allDetails: () => [{ ...appointmentKeys.all()[0], scope: 'detail' }],
    detailById: (appointmentId) => [
        { ...appointmentKeys.allDetails()[0], appointmentId: appointmentId },
    ],
};

export default appointmentKeys;
