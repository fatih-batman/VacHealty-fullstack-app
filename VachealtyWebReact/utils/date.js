export const getDaysBeforeRange = (days) => {
    const date = new Date();
    const target = new Date(date.getTime() - (days * 24 * 60 * 60 * 1000));

    return [date, target];
}
