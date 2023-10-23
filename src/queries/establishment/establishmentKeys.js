const establishmentKeys = {
    all: () => [{ entity: 'establishment' }],
    allLists: () => [{ ...establishmentKeys.all()[0], scope: 'list' }],
    list: ({ page, itemsPerPage, ...q } = {}) => [
        { ...establishmentKeys.allLists()[0], ...q, page, itemsPerPage },
    ],
    suggestionList: ({ page, itemsPerPage, name } = {}) => [
        { ...establishmentKeys.allLists()[0], name, page, itemsPerPage },
    ],
    listByProviderId: (providerId, { page, itemsPerPage, ...q } = {}) => [
        {
            ...establishmentKeys.allLists()[0],
            ...q,
            providerId,
            page,
            itemsPerPage,
        },
    ],
    allDetails: () => [{ ...establishmentKeys.all()[0], scope: 'detail' }],
    detailById: (establishmentId) => [
        { ...establishmentKeys.allDetails()[0], establishmentId: Number(establishmentId) },
    ],
};

export default establishmentKeys;
