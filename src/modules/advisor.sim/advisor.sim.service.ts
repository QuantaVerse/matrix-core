import { Injectable } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";

@Injectable()
export class AdvisorSimService {
    constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) {}

    getHello(): string {
        return "Hello World!";
    }
}
