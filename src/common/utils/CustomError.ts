export class CustomError {
	private message: string
	private error: string
	private statusCode: number
	private date: Date

	private constructor(message: string, error: string, statusCode: number) {
		this.message = message
		this.error = error
		this.statusCode = statusCode
		this.date = new Date()
	}

	public static create(
		message: string,
		error: string,
		statusCode: number,
	): CustomError {
		return new CustomError(message, error, statusCode)
	}

	get Message(): string {
		return this.message
	}
	get Error(): string {
		return this.error
	}
	get StatusCode(): number {
		return this.statusCode
	}
	get Date(): Date {
		return this.date
	}
}
