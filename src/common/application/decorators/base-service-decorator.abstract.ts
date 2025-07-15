import { Result } from 'src/common/utils/Result'
import { IService } from '../service/service.abstract'

export abstract class BaseServiceDecorator<I, O> extends IService<I, O> {
	protected service: IService<I, O>

	constructor(service: IService<I, O>) {
		super()
		this.service = service
	}

	public abstract execute(value: I): Promise<Result<O>>
}
