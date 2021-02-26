import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {UsuarioModule} from './usuario/usuario.module';
import {MascotaModule} from './mascota/mascota.module';
import {CalculadoraModule} from "./calculadora/calculadora.module";

@Module({
    imports: [
        MascotaModule,
        UsuarioModule,
        CalculadoraModule
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}