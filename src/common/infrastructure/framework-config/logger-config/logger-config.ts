import { ConsoleLogger } from "@nestjs/common";
import * as fs from "fs";

enum LogLevel {
	LOG = "LOG",
	ERROR = "ERROR",
	WARN = "WARN",
}

export class FileLogger extends ConsoleLogger {
	private logStream = fs.createWriteStream("app.log", { flags: "a" });

	constructor() {
		super();
		process.on("exit", () => this.logStream.end());

		process.on("SIGINT", () => {
			this.logStream.end();
			process.exit();
		});

		process.on("uncaughtException", (err) => {
			this.error(`Uncaught Exception: ${err.message}`);
			this.writeToFile(
				LogLevel.ERROR,
				`Uncaught Exception - ${err.stack}`,
			);
			process.exit(1);
		});

		process.on("unhandledRejection", (reason: any) => {
			console.log("hola global");
			if (reason instanceof AggregateError) {
				const errors = reason.errors.map((err: any) => {
					return (
						(err.stack as string) ||
						(err.message as string) ||
						JSON.stringify(err)
					);
				});

				this.error(`Unhandled Promise Rejection: ${errors.join(", ")}`);
				this.writeToFile(
					"ERROR",
					`Unhandled Promise Rejection: ${errors.join(", ")}`,
				);
			} else {
				const errorMessage =
					reason instanceof Error
						? reason.stack || reason.message
						: JSON.stringify(reason);
				this.error(`Unhandled Promise Rejection: ${errorMessage}`);
				this.writeToFile(
					"ERROR",
					`Unhandled Promise Rejection - ${errorMessage}`,
				);
			}
		});
	}

	log(message: string, context?: string) {
		super.log(message, context);
		this.writeToFile(LogLevel.LOG, message, context);
	}

	error(message: string, trace?: string, context?: string) {
		super.error(message, context);
		this.writeToFile(LogLevel.ERROR, message, context);
	}

	warn(message: string, context?: string) {
		super.warn(message, context);
		this.writeToFile(LogLevel.WARN, message, context);
	}

	private writeToFile(level: string, message: string, context?: string) {
		const formatter = new Intl.DateTimeFormat("es-ES", {
			day: "2-digit",
			month: "2-digit",
			year: "numeric",
			hour: "2-digit",
			minute: "2-digit",
			second: "2-digit",
			hour12: false,
		});

		const color =
			level == LogLevel.LOG
				? "\x1b[32m"
				: level == LogLevel.ERROR
					? "\x1b[31m"
					: "\x1b[33m";

		const logMessage = `[${formatter.format(new Date())}] ${color + level} [${context || "NestJS"}]: ${message} \x1b[0m \n`;
		this.logStream.write(logMessage);
	}
}
