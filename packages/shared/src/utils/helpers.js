export const formatPhoneNumber = (phoneNumber) => {
    const cleaned = ('' + phoneNumber).replace(/\D/g, '');
    const match = cleaned.match(/(\d{1,2})/g);

    if (match) {
        return match.join(' ');
    }
    return phoneNumber;
};
