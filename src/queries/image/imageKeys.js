const imageKeys = {
    all: () => [{ entity: 'image' }],
    allLists: () => [{ ...imageKeys.all()[0], scope: 'list' }],
    list: ({ page, perPage, ...q } = {}) => [{ ...imageKeys.allLists()[0], ...q, page, perPage }],
    listByEstablishmentId: (establishmentId, { page, perPage, ...q } = {}) => [
        {
            ...imageKeys.allLists()[0],
            ...q,
            establishmentId,
            page,
            perPage,
        },
    ],
    allDetails: () => [{ ...imageKeys.all()[0], scope: 'detail' }],
    detailById: (imageId) => [{ ...imageKeys.allDetails()[0], imageId: imageId }],
};

export default imageKeys;
