export type DateTimeFormatStyle = "full" | "long" | "medium" | "short";
export interface DateTimeFormatOptions
{
    dateStyle?: DateTimeFormatStyle;
    timeStyle?: DateTimeFormatStyle;
}

export type Payload = Record<string, unknown>;
