import { Injectable } from "@nestjs/common";

@Injectable()
export class AdvisorService {
    getHello(): string {
        return "Hello World!";
    }
}
