const barberKeys = {
    all: () => [{ entity: 'barber' }],
    allLists: () => [{ ...barberKeys.all()[0], scope: 'list' }],
    list: ({ page, perPage, ...q } = {}) => [{ ...barberKeys.allLists()[0], ...q, page, perPage }],
    listByEstablishmentId: (establishmentId, { page, perPage, ...q } = {}) => [
        {
            ...barberKeys.allLists()[0],
            ...q,
            establishmentId,
            page,
            perPage,
        },
    ],
    allDetails: () => [{ ...barberKeys.all()[0], scope: 'detail' }],
    detailById: (barberId) => [{ ...barberKeys.allDetails()[0], barberId }],
};

export default barberKeys;
