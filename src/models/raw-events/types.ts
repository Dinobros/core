import type { Timestamp } from "@google-cloud/firestore";
import type { Payload } from "../../core/types.js";

export interface ScreenProperties
{
    width: number;
    height: number;
    orientation: OrientationType;
    colorDepth: number;
    pixelDepth: number;
}
export interface GameInitPayloadV1 extends Payload
{
    ipAddress: string;
    screen: ScreenProperties;
    userAgent: string;
}

export type DisplayModeType = "standalone" | "minimal-ui" | "fullscreen" | "browser";
export interface GameInitPayloadV2 extends GameInitPayloadV1
{
    displayMode: DisplayModeType;
    language: string;
    maxTouchPoints: number;
    version: 2;
}

export type GameInitPayload = GameInitPayloadV1 | GameInitPayloadV2;

export interface AnswerPayload extends Payload
{
    questionId: number;
    answerId: number;
}

export type RawEvent<P extends Payload = Payload, T extends (Date | Timestamp | undefined) = Date> = {
    type: string;
    payload: P;
    deviceId: string;
    sessionId: string;
    userId?: string;

    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
} & (T extends undefined ? { } : { timestamp: T });
