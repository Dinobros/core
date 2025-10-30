import type { Timestamp } from "@google-cloud/firestore";
import type { Payload } from "../../core/types.js";

export interface UserScoreV1<T extends (Date | Timestamp | undefined) = Date>
{
    userId: string;
    username: string;
    score: number;
    timestamp: T;
}
export interface UserScoreV2<T extends (Date | Timestamp | undefined) = Date>
{
    userId: string;
    username: string;
    value: number;
    payload: Payload;
    timestamp: T;
}

export interface RawScoreV1 extends Omit<UserScoreV1<Timestamp>, "score">
{
    level: string | null;
    value: number;
}
export interface RawScoreV2 extends UserScoreV2<Timestamp>
{
    level: string | null;
    version: 2;
}

export type RawScore = RawScoreV1 | RawScoreV2;

export interface RankedScoreV1<T extends (Date | Timestamp | undefined) = Date> extends UserScoreV1<T>
{
    rank: number;
}
export interface RankedScoreV2<T extends (Date | Timestamp | undefined) = Date> extends UserScoreV2<T>
{
    rank: number;
}

export interface BestScoreV1<T extends (Date | Timestamp | undefined) = Date> extends RankedScoreV1<T>
{
    lastUpdate: Timestamp;
}
export interface BestScoreV2<T extends (Date | Timestamp | undefined) = Date> extends RankedScoreV2<T>
{
    lastUpdate: Timestamp;
    version: 2;
}

export type BestScore<T extends (Date | Timestamp | undefined) = Date> = BestScoreV1<T> | BestScoreV2<T>;

export interface LeaderboardV1<T extends (Date | Timestamp | undefined) = Date>
{
    lastUpdate: Timestamp;
    topScores: RankedScoreV1<T>[];
}
export interface LeaderboardV2<T extends (Date | Timestamp | undefined) = Date>
{
    scores: RankedScoreV2<T>[];
    lastUpdate: Timestamp;
    version: 2;
}

export type Leaderboard<T extends (Date | Timestamp | undefined) = Date> =
    LeaderboardV1<T> | LeaderboardV2<T>;
