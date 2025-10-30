export const VERSION = "0.1.4";

export type { DateTimeFormatStyle, DateTimeFormatOptions, Payload } from "./core/types.js";

export { getEmptyStats, statsAggregator, statsRatioComputer } from "./models/index.js";
export type {
    AnswerPayload,
    AnswerStatsData,
    BestScore,
    BestScoreV1,
    BestScoreV2,
    DeviceStatsData,
    DeviceStatsDataV1,
    DeviceStatsDataV2,
    DeviceStatsDataV3,
    DisplayModeType,
    FormFactorStatsData,
    GameInitPayload,
    GameInitPayloadV1,
    GameInitPayloadV2,
    GameStatsData,
    Leaderboard,
    LeaderboardV1,
    LeaderboardV2,
    QuizStatsData,
    RankedScoreV1,
    RankedScoreV2,
    RawEvent,
    RawScore,
    RawScoreV1,
    RawScoreV2,
    RelativeStatsData,
    ScreenProperties,
    SessionsStatsData,
    StatsData,
    StatsDataV1,
    StatsDataV2,
    StatsDataV3,
    SystemStatsData,
    SystemStatsDataV1,
    SystemStatsDataV2,
    SystemStatsDataV3,
    UserAccount,
    UserProperty,
    UserScoreV1,
    UserScoreV2,
    UserStatsData,
    UserStatsDataV1,
    UserStatsDataV2

} from "./models/types.js";

export {
    analyzeGameInitPayload,
    extractBrowser,
    extractOperatingSystem,
    formatDate,
    formatDatetime,
    formatTime,
    humanDatetime,
    humanTimestamp

} from "./utils/index.js";

export type { Browser, OperatingSystem } from "./utils/types.js";
