import type { Timestamp } from "@google-cloud/firestore";
import type { DateTimeFormatOptions } from "../core/types.js";

export const formatDate = (date: Date) => formatDatetime(date).slice(0, 10);
export const formatTime = (date: Date) => formatDatetime(date).slice(11, 16);
export const formatDatetime = (date: Date) => date.toISOString();

export function humanDatetime(datetime?: number | Date)
{
    const options: DateTimeFormatOptions = { dateStyle: "short", timeStyle: "short" };
    const formattedDatetime = new Intl.DateTimeFormat(undefined, options);

    return formattedDatetime.format(datetime);
}
export function humanTimestamp(timestamp?: Timestamp)
{
    if (!(timestamp)) { return humanDatetime(); }

    if (timestamp.toDate) { return humanDatetime(timestamp.toDate()); }
    if (timestamp.toMillis) { return humanDatetime(timestamp.toMillis()); }
    if (timestamp.seconds) { return humanDatetime(timestamp.seconds * 1_000); }

    return humanDatetime();
}
