const providerRequestKeys = {
    all: () => [{ entity: 'providerRequest' }],
    allLists: () => [{ ...providerRequestKeys.all()[0], scope: 'list' }],
    list: ({ page, perPage, ...q } = {}) => [
        { ...providerRequestKeys.allLists()[0], ...q, page, perPage },
    ],
    allDetails: () => [{ ...providerRequestKeys.all()[0], scope: 'detail' }],
    detailById: (providerRequestId) => [{ ...providerRequestKeys.allDetails()[0], providerRequestId }],
};

export default providerRequestKeys;