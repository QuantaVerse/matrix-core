import { Injectable } from "@nestjs/common";

@Injectable()
export class MatrixCoreService {
    getHello(): string {
        return "Hello World!";
    }
}
