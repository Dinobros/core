import type { GameInitPayload } from "../models/raw-events/types.js";

const VERSIONS = new Map([
    [5, "2000"],
    [5.1, "XP"],
    [5.2, "XP"],
    [6, "Vista"],
    [6.1, "7"],
    [6.2, "8"],
    [6.3, "8.1"],
    [10, "10"]
]);

function getWindowsVersion(version: string)
{
    const versionNumber = parseFloat(version);
    const windowsVersion = VERSIONS.get(versionNumber);

    if (windowsVersion) { return windowsVersion; }
    if (versionNumber >= 13) { return "11"; }

    return `NT ${version}`;
}

export interface OperatingSystem
{
    name: "Windows" | "macOS" | "iOS" | "Android" | "Linux" | "Chrome OS" | "Unknown";
    version: string;
}
export interface Browser
{
    name: "Chromium" | "Chrome" | "Edge" | "Opera" | "NW.js" | "Firefox" |
        "Safari" | "Chrome for iOS" | "Edge for iOS" | "Firefox for iOS" |
        "Android Browser" | "Unknown";

    version: string;
    engine: "Chromium" | "Gecko" | "WebKit" | "Unknown";
    context: "Browser" | "NW.js" | "WebApp" | "WebView" | "Unknown";
}

type RegExpMatchCallback<T = void, P = RegExpExecArray> = (results: P) => T;
class RegExpMatcher<T = void, V = void>
{
    protected _default: RegExpMatchCallback<V, void>;
    protected _matches: Map<RegExp, RegExpMatchCallback>;

    public constructor()
    {
        this._default = () => { return undefined as V; };
        this._matches = new Map();
    }

    public on<R = void>(regexs: RegExp | RegExp[], callback: RegExpMatchCallback<R>): RegExpMatcher<T | R, V>
    {
        if (!(Array.isArray(regexs))) { regexs = [regexs]; }

        for (const regex of regexs)
        {
            this._matches.set(regex, callback);
        }

        return this as RegExpMatcher<T | R, V>;
    }
    public default<D = void>(callback: RegExpMatchCallback<D, void>): RegExpMatcher<T, D>
    {
        this._default = (callback as unknown) as RegExpMatchCallback<V, void>;

        return (this as unknown) as RegExpMatcher<T, D>;
    }

    public match(value: string): T | V
    {
        for (const [regex, callback] of this._matches)
        {
            const results = regex.exec(value);
            if (results) { return callback(results) as T; }
        }

        return this._default() as V;
    }
}

export function extractBrowser(userAgent: string): Browser
{
    return new RegExpMatcher<Browser>()
        .on(/edg\/([\d.]+)/i, (results): Browser => ({
            name: "Edge",
            version: results[1],
            engine: "Chromium",
            context: "Browser"
        }))
        .on(/OPR\/([\d.]+)/, (results): Browser => ({
            name: "Opera",
            version: results[1],
            engine: "Chromium",
            context: "Browser"
        }))
        .on(/chrome\/([\d.]+)/i, (results): Browser => new RegExpMatcher<Browser>()
            .on(/wv\)/, (): Browser => ({
                name: "Chrome",
                version: results[1],
                engine: "Chromium",
                context: "WebView"
            }))
            .default((): Browser => ({
                name: "Chrome",
                version: results[1],
                engine: "Chromium",
                context: "Browser"
            }))
            .match(userAgent))
        .on(/nwjs\/([\d.]+)/i, (results): Browser => ({
            name: "NW.js",
            version: results[1],
            engine: "Chromium",
            context: "NW.js"
        }))
        .on(/chromium\/([\d.]+)/i, (results): Browser => ({
            name: "Chromium",
            version: results[1],
            engine: "Chromium",
            context: "Browser"
        }))
        .on(/firefox\/([\d.]+)/i, (results): Browser => ({
            name: "Firefox",
            version: results[1],
            engine: "Gecko",
            context: "Browser"
        }))
        .on(/safari\//i, (): Browser => new RegExpMatcher<Browser>()
            .on(/version\/([\d.]+)/i, (results): Browser => ({
                name: "Safari",
                version: results[1],
                engine: "WebKit",
                context: "Browser"
            }))
            .on(/crios\/([\d.]+)/i, (results): Browser => ({
                name: "Chrome for iOS",
                version: results[1],
                engine: "WebKit",
                context: "Browser"
            }))
            .on(/edgios\/([\d.]+)/i, (results): Browser => ({
                name: "Edge for iOS",
                version: results[1],
                engine: "WebKit",
                context: "Browser"
            }))
            .on(/fxios\/([\d.]+)/i, (results): Browser => ({
                name: "Firefox for iOS",
                version: results[1],
                engine: "WebKit",
                context: "Browser"
            }))
            .default((): Browser => ({
                name: "Safari",
                version: "Unknown",
                engine: "WebKit",
                context: "Browser"
            }))
            .match(userAgent))
        .on(/webkit/i, (): Browser => ({
            name: "Unknown",
            version: "Unknown",
            engine: "WebKit",
            context: "Browser"
        }))
        .default((): Browser => ({
            name: "Unknown",
            version: "Unknown",
            engine: "Unknown",
            context: "Unknown"
        }))
        .match(userAgent);
}
export function extractOperatingSystem(userAgent: string): OperatingSystem
{
    return new RegExpMatcher<OperatingSystem>()
        .on(/windows\s+nt\s+([\d.]+)/i, (results): OperatingSystem => ({
            name: "Windows",
            version: getWindowsVersion(results[1])
        }))
        .on(/mac\s+os\s+x\s+([\d._]+)/i, (results): OperatingSystem => ({
            name: "macOS",
            version: results[1].replace(/_/g, ".")
        }))
        .on([/iphone\s+os\s+([\d._]+)/i, /ipad[^)]*os\s+([\d._]+)/i], (results): OperatingSystem => ({
            name: "iOS",
            version: results[1].replace(/_/g, ".")
        }))
        .on(/(iphone|ipod|ipad)/i, (): OperatingSystem => ({
            name: "iOS",
            version: "Unknown"
        }))
        .on(/android\s+([\d.]+)/i, (results): OperatingSystem => ({
            name: "Android",
            version: results[1]
        }))
        .on(/android/i, (): OperatingSystem => ({
            name: "Android",
            version: "Unknown"
        }))
        .on(/linux|openbsd|freebsd|netbsd/i, (): OperatingSystem => ({
            name: "Linux",
            version: "Unknown"
        }))
        .on(/CrOS/i, (): OperatingSystem => ({
            name: "Chrome OS",
            version: "Unknown"
        }))
        .default((): OperatingSystem => ({
            name: "Unknown",
            version: "Unknown"
        }))
        .match(userAgent);
}

export function analyzeGameInitPayload(payload: GameInitPayload)
{
    const { userAgent } = payload;

    const operatingSystem: OperatingSystem = extractOperatingSystem(userAgent);
    const browser: Browser = extractBrowser(userAgent);

    if ((operatingSystem.name === "Android") && (browser.name === "Safari"))
    {
        browser.name = "Android Browser";
    }

    if (("version" in payload) && (payload.version === 2))
    {
        const { displayMode, maxTouchPoints } = payload;

        if ((browser.context !== "NW.js") && (displayMode === "standalone"))
        {
            browser.context = "WebApp";
        }

        if ((operatingSystem.name === "macOS") && (maxTouchPoints > 2))
        {
            operatingSystem.name = "iOS";
            operatingSystem.version = browser.version;
        }
    }

    return {
        operatingSystem,
        browser
    };
}
