const establishmentKeys = {
    all: () => [{ entity: 'establishment' }],
    allLists: () => [{ ...establishmentKeys.all()[0], scope: 'list' }],
    list: ({ page, perPage, ...q } = {}) => [
        { ...establishmentKeys.allLists()[0], ...q, page, perPage },
    ],
    suggestionList: ({ page, perPage, name } = {}) => [
        { ...establishmentKeys.allLists()[0], name, page, perPage },
    ],
    listByProviderId: (providerId, { page, perPage, ...q } = {}) => [
        {
            ...establishmentKeys.allLists()[0],
            ...q,
            providerId,
            page,
            perPage,
        },
    ],
    allDetails: () => [{ ...establishmentKeys.all()[0], scope: 'detail' }],
    detailById: (establishmentId) => [
        { ...establishmentKeys.allDetails()[0], establishmentId: establishmentId },
    ],
};

export default establishmentKeys;
