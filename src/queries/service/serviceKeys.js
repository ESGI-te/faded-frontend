const serviceKeys = {
    all: () => [{ entity: 'service' }],
    allLists: () => [{ ...serviceKeys.all()[0], scope: 'list' }],
    list: ({ page, perPage, ...q } = {}) => [{ ...serviceKeys.allLists()[0], ...q, page, perPage }],
    listByEstablishmentId: (establishmentId, { page, perPage, ...q } = {}) => [
        {
            ...serviceKeys.allLists()[0],
            ...q,
            establishmentId,
            page,
            perPage,
        },
    ],
    allDetails: () => [{ ...serviceKeys.all()[0], scope: 'detail' }],
    detailById: (serviceId) => [{ ...serviceKeys.allDetails()[0], serviceId: serviceId }],
};

export default serviceKeys;
