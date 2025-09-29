import type { Timestamp } from "@google-cloud/firestore";

export interface UserAccount
{
    emailAddress?: string;
    username?: string;
    provider: "anonymous" | "emailAddress";
    timestamp: Timestamp;
    version: 2;
}

export interface UserProperty<T extends number | string = number | string>
{
    value: T;
    timestamp: Timestamp;
    version: 1;
}
