const planningKeys = {
	all: () => [{ entity: "planning" }],
	allLists: () => [{ ...planningKeys.all()[0], scope: "list" }],
	list: ({ page, perPage, ...q } = {}) => [
		{ ...planningKeys.allLists()[0], ...q, page, perPage },
	],
	listByEstablishmentId: (establishmentId, { page, perPage, ...q } = {}) => [
		{
			...planningKeys.allLists()[0],
			...q,
			establishmentId,
			page,
			perPage,
		},
	],
	allDetails: () => [{ ...planningKeys.all()[0], scope: "detail" }],
	detailById: (planningId) => [
		{ ...planningKeys.allDetails()[0], planningId: planningId },
	],
};

export default planningKeys;
