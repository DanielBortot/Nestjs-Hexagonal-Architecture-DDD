import { Logger } from "@nestjs/common";
import { ILogger } from "src/common/application";

export class NestLogger implements ILogger {

    successLog(serviceName: string, input: string, time: string): void {
        Logger.log(`Successful execute: -- Input: ${input} -- Time: ${time}`, serviceName);
    }
    
    errorLog(serviceName: string, message: string, input: string, time: string, cause: string[]): void {
        Logger.error(`Error execute: Error: ${message} -- Input: ${input} -- Time: ${time} -- StackTrace: ${cause}`, null, serviceName);
    }
    
}