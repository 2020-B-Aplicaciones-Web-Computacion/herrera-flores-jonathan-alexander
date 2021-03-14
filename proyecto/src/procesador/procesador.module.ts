import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {ProcesadorEntity} from "./procesador.entity";
import {ProcesadorController} from "./procesador.controller";
import {ProcesadorService} from "./procesador.service";


@Module({
    imports: [
        TypeOrmModule.forFeature(
            [ProcesadorEntity],
            'default'
        )
    ],
    controllers: [
        ProcesadorController
    ],
    providers: [
        ProcesadorService
    ],
    exports: [
        ProcesadorService
    ]
})

export class ProcesadorModule {

}