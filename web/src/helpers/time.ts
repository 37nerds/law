export const convertToLocalTime = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleString();
};
