const userKeys = {
    all: () => [{ entity: 'user' }],
    allDetails: () => [{ ...userKeys.all()[0], scope: 'detail' }],
    detail: () => [{ ...userKeys.allDetails()[0] }],
};

export default userKeys;
