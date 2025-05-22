export class UserRegisterResponseDto {

    constructor(
        public userId: string,
        public token: string
    ) {}
}