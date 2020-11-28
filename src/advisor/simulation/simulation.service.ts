import { Injectable } from "@nestjs/common";

@Injectable()
export class SimulationService {

    getHello(): string {
        return "Hello World!";
    }
}