const serviceKeys = {
    all: () => [{ entity: 'service' }],
    allLists: () => [{ ...serviceKeys.all()[0], scope: 'list' }],
    list: ({ page, itemsPerPage, ...q } = {}) => [
        { ...serviceKeys.allLists()[0], ...q, page, itemsPerPage },
    ],
    listByEstablishmentId: (establishmentId, { page, itemsPerPage, ...q } = {}) => [
        {
            ...serviceKeys.allLists()[0],
            ...q,
            establishmentId,
            page,
            itemsPerPage,
        },
    ],
    allDetails: () => [{ ...serviceKeys.all()[0], scope: 'detail' }],
    detailById: (serviceId) => [{ ...serviceKeys.allDetails()[0], serviceId: serviceId }],
};

export default serviceKeys;
