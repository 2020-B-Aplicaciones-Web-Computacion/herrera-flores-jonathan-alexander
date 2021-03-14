import {Controller, Get, Header, HttpCode, Req, Res, Headers, Post, Param, Body, Query} from '@nestjs/common';
import {UsuarioService} from "./usuario.service";
import {UsuarioEntity} from "./usuario.entity";
import {FindConditions, FindManyOptions, Like} from "typeorm";

@Controller('usuario')
export class UsuarioController {
    constructor(
        private _usuarioService: UsuarioService
    ) {

    }

    @Get('crear-usuario')
    crearUsuarioVista(
        @Res()
        response,
    ){
        response.render('usuarios/crear')
    }

    @Post('crear-usuario')
    async crearUsuario(
        @Body() parametrosCuerpo,
        @Res() response
    ){
        const respuesta = await this._usuarioService.usuarioEntity.save({
            nombre:parametrosCuerpo.nombre,
            apellido: parametrosCuerpo.apellido
        });
        response.redirect('/usuario/usuarios?mensaje=Se creo el usuario '+
        parametrosCuerpo.nombre)
    }


    @Post('')
    creaUsuario(
        @Body()
            parametrosCuerpo
    ) {
        return this._usuarioService.usuarioEntity.save({
            nombre: parametrosCuerpo.nombre,
            apellido: parametrosCuerpo.apellido
        })
    }

    @Get('usuarios')
    async obtenerUsuarios(
        @Query()
            parametrosConsulta,
        @Res()
            response
    ) {
        let take = 10;
        let skip = 0;
        let order = 'ASC';

        if (parametrosConsulta.skip) {
            skip = parametrosConsulta.skip;
        }

        if (parametrosConsulta.take) {
            take = parametrosConsulta.take;
        }

        if (parametrosConsulta.order) {
            order = parametrosConsulta.order;
        }


        let consultaWhereOR: FindConditions<UsuarioEntity>[] = [
            {
                nombre: Like(
                    parametrosConsulta.busqueda ? parametrosConsulta.busqueda : '%%'
                ),
            },
            {
                apellido: Like(
                    parametrosConsulta.busqueda ? parametrosConsulta.busqueda: '%%'
                )
            }
        ]


        /*return this._usuarioService.usuarioEntity.findAndCount({

            }
        );*/
        let consulta: FindManyOptions<UsuarioEntity> = {
            where: consultaWhereOR,
            take: take,
            skip: skip,
            order: {
                id: order === 'ASC' ? 'ASC' : 'DESC'
            }
        }

        let datos = await this._usuarioService.usuarioEntity.findAndCount(consulta);
        response.render('inicio', {
            datos: datos,
            parametrosConsulta: parametrosConsulta
        })
    }


    @Get('hola')
    @HttpCode(200)
    @Header('Cache-Control', 'none')
    @Header('EPN', 'SISTEMAS')
    hola(
        @Req()
            request,
        @Headers()
            headers,
        // @Res()
        // response // Ustedes deben devolver la respuesta
    ) {
        // response.send('HOLA DESDE SEND')
        console.log(headers);
        // return 'Hola mundo http';
        // return {
        //     nombre:'Adrian'
        // }
        // return '<xml>Hola Mundo</xml>'
        return '<h1>HOLA MUNDO</h1> <img src="https://upload.wikimedia.org/wikipedia/commons/8/8c/Escudo_de_la_Escuela_Polit%C3%A9cnica_Nacional.png" alt="">'
    }

    @Post('parametros-ruta/:numeroUno/:numeroDos')
    parametrosRuta(
        @Param()
            parametrosRuta,
        @Res({passthrough: true})
            response
    ) {
        console.log(parametrosRuta);
        response.header('nueva-header', 'otro valor')
        return 'ok'
    }

    @Get('setear-nombre/:nombre')
    setearNombre(
        @Param()
            parametrosRuta,
        @Req()
            request,
        @Res({passthrough: true})
            response
    ) {
        console.log(request.cookies); //Valor de la cookie en la petición
        //request.cookies.nombreUsuario; //valor de una cookie
        response.cookie('nombreUsuario', parametrosRuta.nombre)
        return 'Cookie con nombre ' + parametrosRuta.nombre + ' seteada'
    }
}