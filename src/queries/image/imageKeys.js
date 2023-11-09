const imageKeys = {
    all: () => [{ entity: 'image' }],
    allLists: () => [{ ...imageKeys.all()[0], scope: 'list' }],
    list: ({ page, itemsPerPage, ...q } = {}) => [
        { ...imageKeys.allLists()[0], ...q, page, itemsPerPage },
    ],
    listByEstablishmentId: (establishmentId, { page, itemsPerPage, ...q } = {}) => [
        {
            ...imageKeys.allLists()[0],
            ...q,
            establishmentId,
            page,
            itemsPerPage,
        },
    ],
    allDetails: () => [{ ...imageKeys.all()[0], scope: 'detail' }],
    detailById: (imageId) => [{ ...imageKeys.allDetails()[0], imageId: imageId }],
};

export default imageKeys;
