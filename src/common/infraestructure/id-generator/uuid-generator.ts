import { IIdGenerator } from "src/common/application/id-generator/id-generator.interface";
import { v4 as uuidv4 } from "uuid";

export class UuidGenerator implements IIdGenerator {

    generateId(): string {
        return uuidv4();
    }
    
}