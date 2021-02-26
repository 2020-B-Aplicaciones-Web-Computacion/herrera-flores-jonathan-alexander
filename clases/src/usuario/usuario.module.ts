import {Module} from '@nestjs/common';
import {UsuarioController} from './usuario.controller';
// @Decorador()
@Module({
    imports: [ // Modulos

    ],
    controllers: [ // Controladores
        UsuarioController
    ],
    providers: [ // Servicios DECLARADOS

    ],
    exports: [ // Servicios EXPORTADOS

    ],
})
export class UsuarioModule {

}