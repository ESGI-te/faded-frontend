const barberKeys = {
    all: () => [{ entity: 'barber' }],
    allLists: () => [{ ...barberKeys.all()[0], scope: 'list' }],
    list: ({ page, itemsPerPage, ...q } = {}) => [
        { ...barberKeys.allLists()[0], ...q, page, itemsPerPage },
    ],
    listByEstablishmentId: (establishmentId, { page, itemsPerPage, ...q } = {}) => [
        {
            ...barberKeys.allLists()[0],
            ...q,
            establishmentId,
            page,
            itemsPerPage,
        },
    ],
    allDetails: () => [{ ...barberKeys.all()[0], scope: 'detail' }],
    detailById: (barberId) => [{ ...barberKeys.allDetails()[0], barberId: barberId }],
};

export default barberKeys;
