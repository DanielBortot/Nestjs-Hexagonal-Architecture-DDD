import { DomainEventRoot } from "../domain-event/domain-event-root.abstract";
import { EntityRoot } from "../entity/entity-root";
import { ValueObjectRoot } from "../value-object/value-object-root.abstract";

export abstract class AggregateRoot<
	T extends ValueObjectRoot<T>,
> extends EntityRoot<T> {
	protected events: DomainEventRoot[] = [];

	protected abstract when(event: DomainEventRoot): void;
	protected abstract validateState(): void;

	protected apply(event: DomainEventRoot): void {
		this.when(event);
		this.validateState();
		this.events.push(event);
	}

	protected constructor(id: T) {
		super(id);
	}

	pullDomainEvents(): DomainEventRoot[] {
		const events = this.events;
		this.events = [];
		return events;
	}
}
