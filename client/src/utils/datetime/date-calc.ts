export function getDateTimeDiff(date1: Date, date2: Date) {
    // difference in milliseconds
    const msDiff = Math.abs(date1.getTime() - date2.getTime());
    return msDiff;
}
