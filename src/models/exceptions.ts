import { RuntimeException } from "@byloth/core";

export class Construct3Exception extends RuntimeException
{
    public readonly code: string;

    public constructor(code: string, cause?: unknown, message?: string, name = "Construct3Exception")
    {
        if (!(message)) { message = `An error occurred in Dinostruct plugin with code: ${code}`; }
        super(message, cause, name);

        this.code = code;
    }

    public override readonly [Symbol.toStringTag]: string = "Construct3Exception";
}
