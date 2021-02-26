import {Body, Controller, Delete, Get, Param, Post, Put, Query, Headers, Req, Res, Redirect} from '@nestjs/common';

@Controller('calculadora')
export class CalculadoraController {
    @Get('suma')
    suma(
        @Req()
            request,
        @Query()
            parametrosQuery,
        @Res({passthrough: true})
            response
    ) {
        if(!request.cookies.nombreUsuario){
            return "Setee su nombre de usuario";
        }
        const resultado = parseFloat(parametrosQuery.numero1) + parseFloat(parametrosQuery.numero2);
        let resp: string[] = []
        resp = this.revisaPuntaje(request, resultado);
        response.cookie('puntaje', resp[0])
        return resp[1]
    }

    @Post('resta')
    resta(
        @Req()
            request,
        @Body()
            parametrosBody,
        @Res({passthrough: true})
            response
    ) {
        if(!request.cookies.nombreUsuario){
            return "Setee su nombre de usuario";
        }
        const resultado = parametrosBody.numero1 - parametrosBody.numero2;
        let resp: string[] = []
        resp = this.revisaPuntaje(request, resultado);
        response.cookie('puntaje', resp[0])
        return resp[1]
    }

    @Put('multiplicacion/:numero1/:numero2')
    multiplicacion(
        @Req()
            request,
        @Param()
            parametrosRuta,
        @Res({passthrough: true})
            response
    ) {
        if(!request.cookies.nombreUsuario){
            return "Setee su nombre de usuario";
        }
        const resultado = parametrosRuta.numero1 * parametrosRuta.numero2;
        let resp: string[] = []
        resp = this.revisaPuntaje(request, resultado);
        response.cookie('puntaje', resp[0])
        return resp[1]
    }

    @Delete('division')
    division(
        @Req()
            request,
        @Headers()
            parametrosHeader,
        @Res({passthrough: true})
            response
    ) {
        if(!request.cookies.nombreUsuario){
            return "Setee su nombre de usuario";
        }
        const resultado = parametrosHeader.numero1 / parametrosHeader.numero2;
        let resp: string[] = []
        resp = this.revisaPuntaje(request, resultado);
        response.cookie('puntaje', resp[0])
        return resp[1]
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
        response.cookie('nombreUsuario', parametrosRuta.nombre)
        return 'Cookie con nombre ' + parametrosRuta.nombre + ' seteada'
    }

    revisaPuntaje(request, resultado) {
        let resp: string[] = []
        let cookie = request.cookies.puntaje

        if (!cookie || parseFloat(cookie) < 0 || cookie == 'NaN') {
            resp.push((100 - resultado).toString())
            resp.push(resultado)
        } else {
            resp.push((cookie - resultado).toString())
            cookie = cookie - resultado
            if (cookie < 0) {
                resp.push(resultado + "<br>Felicidades " + request.cookies.nombreUsuario + " ganaste")
            } else {
                resp.push(resultado)
            }
        }

        return resp
    }
}