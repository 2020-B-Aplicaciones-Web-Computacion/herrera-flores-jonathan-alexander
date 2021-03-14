import {Controller, Get, Header, HttpCode, Req, Res, Headers, Post, Param, Body, Query} from '@nestjs/common';
import {FabricanteService} from "./fabricante.service";
import {FabricanteEntity} from "./fabricante.entity";
import {FindConditions, FindManyOptions, FindOneAndReplaceOption, FindOneOptions, Like} from "typeorm";
import {isEmpty} from "@nestjs/common/utils/shared.utils";

@Controller('fabricante')
export class FabricanteController {
    constructor(
        private _fabricanteService: FabricanteService
    ) {

    }

    private page = 1

    @Get('crear-fabricante')
    crearFabricanteVista(
        @Res()
            response,
    ) {
        response.render('fabricantes/crear')
    }

    @Post('crear-fabricante')
    async crearFabricante(
        @Body() parametrosCuerpo,
        @Res() response
    ) {
        const respuesta = await this._fabricanteService.fabricanteEntity.save({
            nombre: parametrosCuerpo.nombre,
            ubicacion: parametrosCuerpo.ubicacion,
            fundacion: parametrosCuerpo.fundacion,
            presidente: parametrosCuerpo.presidente,
            ingresos: parametrosCuerpo.ingresos,
            empleados: parametrosCuerpo.empleados
        });
        response.redirect('/fabricante/fabricantes?mensaje=Se creo el fabricante ' +
            parametrosCuerpo.nombre)
    }

    @Get('editar')
    async editarFabricantes(
        @Query()
            params,
        @Res()
            response,
    ) {
        let consultaWhereOR: FindConditions<FabricanteEntity>[] = [
            {
                id: Like(
                    params.id ? params.id : '%'
                ),
            }
        ]

        let consulta: FindManyOptions<FabricanteEntity> = {
            where: consultaWhereOR,
            take: 1
        }

        let datos = await this._fabricanteService.fabricanteEntity.findAndCount(consulta);
        response.render('fabricantes/editar', {
            datos: datos[0][0],
            params: params
        })
    }

    @Post('editar')
    async editarFabricantesGuardar(
        @Body()
            bodyParams,
        @Query()
            queryParams,
        @Res()
            response
    ) {

        let entity = {}
        if (bodyParams.nombre) {
            entity['nombre'] = bodyParams.nombre
        }
        if (bodyParams.ubicacion) {
            entity['ubicacion'] = bodyParams.ubicacion
        }
        if (bodyParams.fundacion) {
            entity['fundacion'] = bodyParams.fundacion
        }
        if (bodyParams.presidente) {
            entity['presidente'] = bodyParams.presidente
        }
        if (bodyParams.ingresos) {
            entity['ingresos'] = bodyParams.ingresos
        }
        if (bodyParams.empleados) {
            entity['empleados'] = bodyParams.empleados
        }


        try{
            const respuesta = await this._fabricanteService.fabricanteEntity.update({
                id: queryParams.id
            }, entity);
            response.redirect('/fabricante/fabricantes?mensaje=Se modificó el fabricante exitosamente')
        } catch {
            response.redirect('/fabricante/fabricantes?mensaje=No se modificaron los datos')
        }
    }

    @Get('eliminar')
    async eliminarFabricante(
        @Query()
            queryParams,
        @Res()
            response
    ) {
        try {
            await this._fabricanteService.fabricanteEntity.delete({
                    id: queryParams.id
                }
            )
            response.redirect('/fabricante/fabricantes?mensaje=Eliminado correctamente')
        } catch {
            response.redirect('/fabricante/fabricantes?mensaje=No se pudo eliminar')
        }
    }

    @Get('fabricantes')
    async obtenerFabricantes(
        @Query()
            parametrosConsulta,
        @Res()
            response
    ) {
        let take = 2;
        let skip = 0;
        let order = 'ASC';

        if (parametrosConsulta.order) {
            order = parametrosConsulta.order;
        }

        if (parametrosConsulta.page) {
            this.page = parseInt(parametrosConsulta.page);
            skip = 2 * (this.page - 1);
        }

        let consultaWhereOR: FindConditions<FabricanteEntity>[] = [
            {
                nombre: Like(
                    parametrosConsulta.busqueda ? parametrosConsulta.busqueda : '%%'
                ),
            }
        ]

        let consulta: FindManyOptions<FabricanteEntity> = {
            where: consultaWhereOR,
            take: take,
            skip: skip,
            order: {
                id: order === 'ASC' ? 'ASC' : 'DESC'
            }
        }

        let datos = await this._fabricanteService.fabricanteEntity.findAndCount(consulta);
        response.render('fabricantes/inicio', {
            datos: datos,
            parametrosConsulta: parametrosConsulta,
            page: this.page
        })
    }
}