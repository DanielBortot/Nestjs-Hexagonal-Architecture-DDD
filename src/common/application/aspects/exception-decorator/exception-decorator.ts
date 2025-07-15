import { Result } from 'src/common/utils/Result'
import { BaseServiceDecorator } from '../../decorators/base-service-decorator.abstract'
import { IService } from '../../service/service.abstract'

export class ExceptionDecorator<I, O> extends BaseServiceDecorator<I, O> {
	constructor(service: IService<I, O>) {
		super(service)
	}

	async execute(value: I): Promise<Result<O>> {
		try {
			const response = await this.service.execute(value)
			if (response.isError) throw response.Error
			return response
		} catch (err) {
			throw err
		}
	}
}
