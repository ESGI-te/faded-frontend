const serviceCategoryKeys = {
    all: () => [{ entity: 'serviceCategory' }],
    allLists: () => [{ ...serviceCategoryKeys.all()[0], scope: 'list' }],
    list: ({ page, perPage, ...q } = {}) => [
        { ...serviceCategoryKeys.allLists()[0], ...q, page, perPage },
    ],
};

export default serviceCategoryKeys;
