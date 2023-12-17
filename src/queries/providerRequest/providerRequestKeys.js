
const providerRequestKeys = {
    all: () => [{ entity: 'providerRequest' }],
    allDetails: () => [{ ...providerRequestKeys.all()[0], scope: 'detail' }],
    detail: () => [{ ...providerRequestKeys.allDetails()[0] }],
    allLists: () => [{ ...providerRequestKeys.all()[0], scope: 'list' }],
    list: ({ page, perPage, ...q } = {}) => [
        { ...providerRequestKeys.allLists()[0], ...q, page, perPage },
    ],
};

export default providerRequestKeys;