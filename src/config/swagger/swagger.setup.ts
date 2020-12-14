import { INestApplication } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

import { ISwaggerConfigInterface } from "../../common/interfaces/swagger-config.interface";

export function setupSwagger(app: INestApplication, config: ISwaggerConfigInterface) {
    const options = new DocumentBuilder()
        .setTitle(config.title)
        .setDescription(config.description)
        .setVersion(config.version)
        .addServer(`${config.scheme}://`)
        .addTag(config.tag)
        .build();

    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup(config.path, app, document);
}
