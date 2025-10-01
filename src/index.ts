export const VERSION = "0.1.1";

export type { DateTimeFormatStyle, DateTimeFormatOptions, Payload } from "./core/types.js";

export { getEmptyStats, statsAggregator, statsRatioComputer } from "./models/index.js";
export type {
    AnswerPayload,
    AnswerStatsData,
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
    QuizStatsData,
    RawEvent,
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
