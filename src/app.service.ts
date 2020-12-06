import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async getHello(): Promise<string> {
        await this.sleep(1000);
        return "Hello World!";
    }
}
