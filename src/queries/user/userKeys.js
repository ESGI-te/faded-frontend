const userKeys = {
    all: () => [{ entity: 'user' }],
    allDetails: () => [{ ...userKeys.all()[0], scope: 'detail' }],
    detailById: (userId) => [{ ...userKeys.allDetails()[0], userId }],
    detail: () => [{ ...userKeys.allDetails()[0] }],
};

export default userKeys;
