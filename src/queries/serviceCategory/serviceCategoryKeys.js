const serviceCategoryKeys = {
    all: () => [{ entity: 'serviceCategory' }],
    allLists: () => [{ ...serviceCategoryKeys.all()[0], scope: 'list' }],
    list: ({ page, itemsPerPage, ...q } = {}) => [
        { ...serviceCategoryKeys.allLists()[0], ...q, page, itemsPerPage },
    ],
};

export default serviceCategoryKeys;
