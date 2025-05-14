import { ConsoleLogger } from '@nestjs/common';
import * as fs from 'fs';

export class FileLogger extends ConsoleLogger {
    private logStream = fs.createWriteStream('app.log', { flags: 'a' });

    constructor() {
        super();
        process.on('exit', () => this.logStream.end());
        process.on('SIGINT', () => {
            this.logStream.end();
            process.exit();
        });
    }

    log(message: string, context?: string) {
        super.log(message, context);
        this.writeToFile('LOG', message, context);
    }

    error(message: string, trace?: string, context?: string) {
        super.error(message, trace, context);
        this.writeToFile('ERROR', message, context);
    }

    warn(message: string, context?: string) {
        super.warn(message, context);
        this.writeToFile('WARN', message, context);
    }

    private writeToFile(level: string, message: string, context?: string) {
        const formatter = new Intl.DateTimeFormat('es-ES', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        });

        const logMessage = `[${formatter.format(new Date())}] ${level} [${context || 'NestJS'}]: ${message}\n`;
        this.logStream.write(logMessage);
    }
}