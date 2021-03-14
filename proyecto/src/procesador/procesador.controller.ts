import {Body, Controller, Get, Post, Query, Res} from "@nestjs/common";
import {ProcesadorService} from "./procesador.service";
import {FindConditions, FindManyOptions, Like} from "typeorm";
import {ProcesadorEntity} from "../procesador/procesador.entity";
import {isEmpty} from "@nestjs/common/utils/shared.utils";

@Controller('procesador')
export class ProcesadorController {

    private fkFabricante
    private page = 1

    constructor(
        private _procesadorService: ProcesadorService
    ) {
    }

    @Get('crear-procesador')
    crearProcesadorVista(
        @Res()
            response,
    ) {
        response.render('procesadores/crear')
    }

    @Post('crear-procesador')
    async crearProcesador(
        @Body() parametrosCuerpo,
        @Res() response
    ) {
        const respuesta = await this._procesadorService.procesadorEntity.save({
            nombre: parametrosCuerpo.nombre,
            lanzamiento: parametrosCuerpo.lanzamiento,
            arquitectura: parametrosCuerpo.arquitectura,
            zocalo: parametrosCuerpo.zocalo,
            nucleos: parametrosCuerpo.nucleos,
            fkFabricante: this.fkFabricante
        });
        response.redirect('/procesador/procesadores?fabricante='+this.fkFabricante+'&&mensaje=Se creó el procesador ' +
            parametrosCuerpo.nombre)
    }

    @Get('editar')
    async editarProcesador(
        @Query()
            params,
        @Res()
            response,
    ) {
        let consultaWhereOR: FindConditions<ProcesadorEntity>[] = [
            {
                id: Like(
                    params.id ? params.id : '%'
                ),
            }
        ]

        let consulta: FindManyOptions<ProcesadorEntity> = {
            where: consultaWhereOR,
            take: 1
        }

        let datos = await this._procesadorService.procesadorEntity.findAndCount(consulta);
        response.render('procesadores/editar', {
            datos: datos[0][0],
            params: params
        })
    }

    @Post('editar')
    async editarProcesadorGuardar(
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
        if (bodyParams.lanzamiento) {
            entity['lanzamiento'] = bodyParams.lanzamiento
        }
        if (bodyParams.arquitectura) {
            entity['arquitectura'] = bodyParams.arquitectura
        }
        if (bodyParams.zocalo) {
            entity['zocalo'] = bodyParams.zocalo
        }
        if (bodyParams.nucleos) {
            entity['nucleos'] = bodyParams.nucleos
        }

        try {
            const respuesta = await this._procesadorService.procesadorEntity.update({
                id: queryParams.id
            }, entity);
            response.redirect('/procesador/procesadores?fabricante='+this.fkFabricante+'&&mensaje=Se modificó el procesador exitosamente')
        } catch {
            response.redirect('/procesador/procesadores?fabricante='+this.fkFabricante+'&&mensaje=No se modificaron los datos')
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
            await this._procesadorService.procesadorEntity.delete({
                    id: queryParams.id
                }
            )
            response.redirect('/procesador/procesadores?fabricante='+this.fkFabricante+'&&mensaje=Eliminado correctamente')
        } catch {
            response.redirect('/procesador/procesadores?fabricante='+this.fkFabricante+'&&mensaje=No se pudo eliminar')
        }
    }

    @Get('procesadores')
    async obtenerProcesadores(
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


        if (parametrosConsulta.fabricante) {
            this.fkFabricante = parametrosConsulta.fabricante;
        } else {
            this.fkFabricante = "1"
        }

        let consultaWhereAND: FindConditions<ProcesadorEntity>[] = [
            {
                nombre: Like(
                    parametrosConsulta.busqueda ? parametrosConsulta.busqueda : '%%'
                ),
                fkFabricante: Like(
                    this.fkFabricante ? this.fkFabricante : '%%'
                ),
            }
        ]

        let consulta: FindManyOptions<ProcesadorEntity> = {
            where: consultaWhereAND,
            take: take,
            skip: skip,
            order: {
                id: order === 'ASC' ? 'ASC' : 'DESC'
            }
        }

        let datos = await this._procesadorService.procesadorEntity.findAndCount(consulta);
        response.render('procesadores/inicio', {
            datos: datos,
            parametrosConsulta: parametrosConsulta,
            page: this.page
        })
    }

}