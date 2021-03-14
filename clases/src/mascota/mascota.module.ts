import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {MascotaEntity} from "./mascota.entity";
import {MascotaController} from "./mascota.controller";
import {MascotaService} from "./mascota.service";


@Module({
    imports: [ //Modulos
        TypeOrmModule.forFeature(
            [MascotaEntity],
            'default'
        )
    ],
    controllers: [ // controladores
        MascotaController
    ],
    providers: [ //Servicios DECLARADOS
        MascotaService
    ],
    exports: [ //Servicios EXPORTADOS
        MascotaService
    ]
})

export class MascotaModule {

}