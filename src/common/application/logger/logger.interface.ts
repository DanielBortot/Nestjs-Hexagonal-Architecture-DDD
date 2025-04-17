export interface ILogger {
    successLog(serviceName: string, input: string, time: string): void;
    errorLog(serviceName: string, message: string, input: string, time: string, cause: string[]): void;
}