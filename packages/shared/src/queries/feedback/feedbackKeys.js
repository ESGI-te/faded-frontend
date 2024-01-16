const feedbackKeys = {
    all: () => [{ entity: 'feedback' }],
    allLists: () => [{ ...feedbackKeys.all()[0], scope: 'list' }],
    list: ({ page, perPage, ...q } = {}) => [
        { ...feedbackKeys.allLists()[0], ...q, page, perPage },
    ],
    listByEstablishmentId: (establishmentId, { page, perPage, ...q } = {}) => [
        {
            ...feedbackKeys.allLists()[0],
            ...q,
            establishmentId,
            page,
            perPage,
        },
    ],
    allDetails: () => [{ ...feedbackKeys.all()[0], scope: 'detail' }],
    detailById: (feedbackId) => [{ ...feedbackKeys.allDetails()[0], feedbackId: feedbackId }],
};

export default feedbackKeys;
