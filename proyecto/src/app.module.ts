import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {FabricanteModule} from './fabricante/fabricante.module';
import {ProcesadorModule} from './procesador/procesador.module';
import {TypeOrmModule} from "@nestjs/typeorm";
import {FabricanteEntity} from "./fabricante/fabricante.entity";
import {ProcesadorEntity} from "./procesador/procesador.entity";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      name:'default',
      type:'mysql',
      port:3010,
      username:'epn',
      password:'epn12345678',
      database: 'web',
      dropSchema:false,
      synchronize: true, entities: [
        FabricanteEntity,
        ProcesadorEntity,
      ]
    }),
    ProcesadorModule,
    FabricanteModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}