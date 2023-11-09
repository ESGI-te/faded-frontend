const feedbackKeys = {
    all: () => [{ entity: 'feedback' }],
    allLists: () => [{ ...feedbackKeys.all()[0], scope: 'list' }],
    list: ({ page, itemsPerPage, ...q } = {}) => [
        { ...feedbackKeys.allLists()[0], ...q, page, itemsPerPage },
    ],
    listByEstablishmentId: (establishmentId, { page, itemsPerPage, ...q } = {}) => [
        {
            ...feedbackKeys.allLists()[0],
            ...q,
            establishmentId,
            page,
            itemsPerPage,
        },
    ],
    allDetails: () => [{ ...feedbackKeys.all()[0], scope: 'detail' }],
    detailById: (feedbackId) => [{ ...feedbackKeys.allDetails()[0], feedbackId: feedbackId }],
};

export default feedbackKeys;
