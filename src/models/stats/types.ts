import type { Timestamp } from "@google-cloud/firestore";

export interface RelativeStatsData
{
    total: number;
    ratio: number;
}

export interface SystemStatsDataV1
{
    android: RelativeStatsData;
    ios: RelativeStatsData;
    windows: RelativeStatsData;
}
export interface SystemStatsDataV2 extends Omit<SystemStatsDataV1, "ios">
{
    apple: RelativeStatsData;
}
export interface SystemStatsDataV3 extends SystemStatsDataV2
{
    others: RelativeStatsData;
}

export type SystemStatsData = SystemStatsDataV1 | SystemStatsDataV2 | SystemStatsDataV3;

export interface UserStatsDataV1
{
    new: number;
    active: number;
}
export interface UserStatsDataV2 extends UserStatsDataV1
{
    returning: number;
}

export type UserStatsData = UserStatsDataV1 | UserStatsDataV2;

export interface SessionsStatsData
{
    active: number;
    averageTime: number;
    hours: number[];
}

export interface FormFactorStatsData
{
    mobile: RelativeStatsData;
    tablet: RelativeStatsData;
    desktop: RelativeStatsData;
}

export interface DeviceStatsDataV1
{
    total: number;
    formFactor: FormFactorStatsData;
    systems: SystemStatsDataV1;
}
export interface DeviceStatsDataV2 extends Omit<DeviceStatsDataV1, "systems">
{
    systems: SystemStatsDataV2;
}
export interface DeviceStatsDataV3 extends Omit<DeviceStatsDataV1, "systems">
{
    systems: SystemStatsDataV3;
}

export type DeviceStatsData = DeviceStatsDataV1 | DeviceStatsDataV2 | DeviceStatsDataV3;

export interface GameStatsData
{
    new: number;
    completed: number;
    abandoned: number;
    ratio: number;
}

export interface AnswerStatsData extends RelativeStatsData
{
    right: number;
    wrong: number;
}
export interface QuizStatsData extends GameStatsData
{
    answers: AnswerStatsData;
    questions: Record<number, AnswerStatsData>;
}

export interface StatsDataV1<T extends Date | Timestamp = Date>
{
    date: T;
    users: UserStatsDataV1;
    sessions: SessionsStatsData;
    devices: DeviceStatsDataV1;
    games: GameStatsData;
    quizzes: QuizStatsData;
    events: Record<string, number>;
}
export interface StatsDataV2<T extends Date | Timestamp = Date>
    extends Omit<StatsDataV1<T>, "users" | "devices">
{
    users: UserStatsDataV2;
    devices: DeviceStatsDataV2;
}
export interface StatsDataV3<T extends Date | Timestamp = Date>
    extends Omit<StatsDataV2<T>, "users" | "devices">
{
    users: UserStatsDataV2;
    devices: DeviceStatsDataV3;
    version: 3;
}

export type StatsData<T extends Date | Timestamp = Date> =
    StatsDataV1<T> | StatsDataV2<T> | StatsDataV3<T>;
