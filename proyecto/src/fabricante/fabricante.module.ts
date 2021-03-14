import {Module} from '@nestjs/common';
import {FabricanteController} from './fabricante.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {FabricanteEntity} from "./fabricante.entity";
import {FabricanteService} from "./fabricante.service";

@Module({
    imports: [
        TypeOrmModule.forFeature(
            [FabricanteEntity],
            'default'
        )
    ],
    controllers: [ // Controladores
        FabricanteController
    ],
    providers: [ // Servicios DECLARADOS
        FabricanteService
    ],
    exports: [ // Servicios EXPORTADOS

    ],
})
export class FabricanteModule {

}