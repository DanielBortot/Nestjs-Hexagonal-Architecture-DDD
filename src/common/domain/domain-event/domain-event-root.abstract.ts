export abstract class DomainEventRoot {
	private ocurredOn: Date;
	private eventName: string;

	private constructor() {
		this.ocurredOn = new Date();
		this.eventName = this.constructor.name;
	}

	get OcurredOn(): Date {
		return this.ocurredOn;
	}

	get EventName(): string {
		return this.eventName;
	}

	abstract serialize(): string;
}
