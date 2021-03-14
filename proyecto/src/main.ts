import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';

const helmet = require("helmet");
async function bootstrap() {
  const app:any = await NestFactory.create(AppModule);
  app.use(helmet());
  app.set('view engine','ejs')

  await app.listen(3100);
}

bootstrap();