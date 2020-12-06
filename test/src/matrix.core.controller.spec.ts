import { Test, TestingModule } from "@nestjs/testing";
import { AppController } from "../../src/app.controller";
import { AppService } from "../../src/app.service";

describe("AppController", () => {
    let matrixCoreController: AppController;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            controllers: [AppController],
            providers: [AppService]
        }).compile();

        matrixCoreController = app.get<AppController>(AppController);
    });

    describe("root", () => {
        it('should return "Hello World!"', () => {
            expect(matrixCoreController.getHello()).toBe("Hello World!");
        });
    });
});
