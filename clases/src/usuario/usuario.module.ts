import {Module} from '@nestjs/common';
import {UsuarioController} from './usuario.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {UsuarioEntity} from "./usuario.entity";
import {UsuarioService} from "./usuario.service";
// @Decorador()
@Module({
    imports: [ // Modulos
        TypeOrmModule.forFeature(
            [UsuarioEntity],
            'default'
        )
    ],
    controllers: [ // Controladores
        UsuarioController
    ],
    providers: [ // Servicios DECLARADOS
        UsuarioService
    ],
    exports: [ // Servicios EXPORTADOS

    ],
})
export class UsuarioModule {

}