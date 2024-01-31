export const getDirtyValues = (dirtyFields, allValues) => {
    // NOTE: Recursive function.

    // If *any* item in an array was modified, the entire array must be submitted,
    // because there's no way to indicate "placeholders" for unchanged elements.
    // `dirtyFields` is `true` for leaves.
    if (dirtyFields === true || Array.isArray(dirtyFields)) {
        return allValues;
    }

    // Here, we have an object.
    return Object.fromEntries(
        Object.entries(dirtyFields).map(([key, value]) => [
            key,
            typeof value === 'object' ? getDirtyValues(value, allValues[key]) : allValues[key],
        ]),
    );
};

export const filterFalsyValues = (obj) => {
    if (Array.isArray(obj)) {
        // If it's an array, filter each element recursively
        const filteredArray = obj
            .map((item) => filterFalsyValues(item))
            .filter((item) => item !== undefined && item !== null);
        return filteredArray.length === 0 ? undefined : filteredArray;
    }

    if (typeof obj === 'object' && obj !== null) {
        // If it's an object, filter its properties recursively
        const filteredObj = {};
        for (const [key, value] of Object.entries(obj)) {
            const filteredValue = filterFalsyValues(value);
            if (filteredValue !== undefined && filteredValue !== null) {
                filteredObj[key] = filteredValue;
            }
        }

        // Check if all values in the object are falsy (or undefined/null)
        const allValuesFalsy = Object.values(filteredObj).every((value) => !value);
        return allValuesFalsy ? undefined : filteredObj;
    }

    // If it's a non-object value, return it if it's truthy, otherwise, exclude it
    return obj || undefined;
};
