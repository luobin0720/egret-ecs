class Debug{
    private static log(type: LogType, format: string, ...args: object[]){
        switch (type){
            case LogType.Error:
                console.error(type + ": " + format, args);
                break;
            case LogType.Warn:
                console.warn(type + ": " + format, args);
                break;
            case LogType.Log:
                console.log(type + ": " + format, args);
                break;
            case LogType.Info:
                console.info(type + ": " + format, args);
                break;
            case LogType.Trace:
                console.trace(type + ": " + format, args);
                break;
            default:
                throw new Error();
        }
    }

    public static warnIf(condition: boolean, format: string, ...args: object[]){
        if (condition)
            this.log(LogType.Warn, format, args);
    }
}

enum LogType{
    Error,
    Warn,
    Log,
    Info,
    Trace,
}