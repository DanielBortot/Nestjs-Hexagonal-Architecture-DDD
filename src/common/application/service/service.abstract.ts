import { Result } from "src/common/utils/Result";

export abstract class IService<I,O> {
    
    public abstract execute(value: I): Result<O>;
    
    get ClassName(): string {
        return this.constructor.name;
    }
}