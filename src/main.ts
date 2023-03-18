import { Logger, ValidationError, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DTOValidationException } from './config/dto.validation.exception';


const port = process.env.PORT;

async function bootstrap() {
  const appOptions = {
    cors: true,
  };
  const app = await NestFactory.create(AppModule, appOptions);
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors: ValidationError[]) =>
        new DTOValidationException(errors),
    }),
  );
 
  await app.listen(port);
  Logger.log(`server running on : ${port}`);
}
bootstrap();
