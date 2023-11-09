const openingHoursKeys = {
    all: () => [{ entity: 'openingHours' }],
    allLists: () => [{ ...openingHoursKeys.all()[0], scope: 'list' }],
    list: ({ page, itemsPerPage, ...q } = {}) => [
        { ...openingHoursKeys.allLists()[0], ...q, page, itemsPerPage },
    ],
    listByEstablishmentId: (establishmentId, { page, itemsPerPage, ...q } = {}) => [
        {
            ...openingHoursKeys.allLists()[0],
            ...q,
            establishmentId,
            page,
            itemsPerPage,
        },
    ],
    allDetails: () => [{ ...openingHoursKeys.all()[0], scope: 'detail' }],
    detailById: (openingHoursId) => [
        { ...openingHoursKeys.allDetails()[0], openingHoursId: openingHoursId },
    ],
};

export default openingHoursKeys;
