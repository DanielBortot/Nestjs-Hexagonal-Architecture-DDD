import { Result } from "src/common/utils/Result";
import { BaseServiceDecorator } from "../../decorators/base-service-decorator.abstract";
import { IService } from "../../service/service.abstract";
import { ILogger } from "../../logger/logger.interface";
import { ITimer } from "../../timer/timer.interface";

export class LoggerDecorator<I, O> extends BaseServiceDecorator<I, O> {
	private logger: ILogger;
	private timer: ITimer;

	constructor(service: IService<I, O>, logger: ILogger, timer: ITimer) {
		super(service);
		this.logger = logger;
		this.timer = timer;
	}

	async execute(value: I): Promise<Result<O>> {
		const beginingTime = this.timer.setTime();
		const data = await this.service.execute(value);
		const endingTime = this.timer.setTime();
		const time = this.timer.getTime(beginingTime, endingTime);

		if (data.isError) {
			this.logger.errorLog(
				this.service.ClassName,
				data.Error.message,
				JSON.stringify(value),
				time.toString() + "ms",
				data.Error.Stacks,
			);
		} else {
			this.logger.successLog(
				this.service.ClassName,
				JSON.stringify(value),
				time.toString() + "ms",
			);
		}

		return data;
	}
}
