export class RequestPaginationDto {

    constructor(
        public page: number,
        public perpage: number
    ) {}

    get Page(): number {
        return this.page;
    }

    get Perpage(): number {
        return this.perpage;
    }
}