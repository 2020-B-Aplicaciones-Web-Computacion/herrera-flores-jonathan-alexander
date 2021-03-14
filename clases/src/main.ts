import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import * as cookieParser from 'cookie-parser';

const helmet = require("helmet");
const session = require("express-session");
const FileStore = require("session-file-store")(session);
var fileStoreOptions = {};
async function bootstrap() {
    const app:any = await NestFactory.create(AppModule);
    app.use(cookieParser());
    app.use(helmet());
    app.set('view engine','ejs')
    app.use(session({
        store: new FileStore(fileStoreOptions),
        secret: 'SUPER SECRETO',
        cookie:{
            //expires: new Date(Date.now()+ 1e4)
        }
    }));

    await app.listen(3001);
}

bootstrap();