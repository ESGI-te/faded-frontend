const providerKeys = {
    all: () => [{ entity: 'provider' }],
    allLists: () => [{ ...providerKeys.all()[0], scope: 'list' }],
    list: ({ page, perPage, ...q } = {}) => [{ ...providerKeys.allLists()[0], ...q, page, perPage }],
    allDetails: () => [{ ...providerKeys.all()[0], scope: 'detail' }],
    detailById: (providerId) => [{ ...providerKeys.allDetails()[0], providerId: providerId }],
};

export default providerKeys;