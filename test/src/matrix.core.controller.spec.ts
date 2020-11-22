import { Test, TestingModule } from "@nestjs/testing";
import { MatrixCoreController } from "../../src/matrix.core.controller";
import { MatrixCoreService } from "../../src/matrix.core.service";

describe("AppController", () => {
    let matrixCoreController: MatrixCoreController;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            controllers: [MatrixCoreController],
            providers: [MatrixCoreService]
        }).compile();

        matrixCoreController = app.get<MatrixCoreController>(MatrixCoreController);
    });

    describe("root", () => {
        it('should return "Hello World!"', () => {
            expect(matrixCoreController.getHello()).toBe("Hello World!");
        });
    });
});
