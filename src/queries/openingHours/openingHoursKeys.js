const openingHoursKeys = {
    all: () => [{ entity: 'openingHours' }],
    allLists: () => [{ ...openingHoursKeys.all()[0], scope: 'list' }],
    list: ({ page, perPage, ...q } = {}) => [
        { ...openingHoursKeys.allLists()[0], ...q, page, perPage },
    ],
    listByEstablishmentId: (establishmentId, { page, perPage, ...q } = {}) => [
        {
            ...openingHoursKeys.allLists()[0],
            ...q,
            establishmentId,
            page,
            perPage,
        },
    ],
    allDetails: () => [{ ...openingHoursKeys.all()[0], scope: 'detail' }],
    detailById: (openingHoursId) => [
        { ...openingHoursKeys.allDetails()[0], openingHoursId: openingHoursId },
    ],
};

export default openingHoursKeys;
