import { getDateTimeDiff } from './date-calc';

const ONE_MINUTE = 1000 * 60; // in ms
const ONE_HOUR = ONE_MINUTE * 60;
const ONE_DAY = ONE_HOUR * 24;
const ONE_WEEK = ONE_DAY * 7;

export function getDateTimeDiffFormat(date1: Date, date2: Date) {
    const msDiff = getDateTimeDiff(date1, date2);
    if (msDiff / ONE_MINUTE < 1) {
        return 'now';
    }
    if (msDiff / ONE_HOUR < 1) {
        // get diff in minutes
        return `${Math.round(msDiff / ONE_MINUTE)}m`;
    }
    if (msDiff / ONE_DAY < 1) {
        return `${Math.round(msDiff / ONE_HOUR)}h`;
    }
    if (msDiff / ONE_WEEK < 1) {
        return `${Math.round(msDiff / ONE_DAY)}d`;
    }
    // can be extended by adding formats for months and years.
    return `${Math.round(msDiff / ONE_WEEK)}w`;
}
