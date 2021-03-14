import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {ProcesadorEntity} from "../procesador/procesador.entity";

@Entity('FABRICANTE')
export class FabricanteEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        type: 'varchar',
        length: 100,
        nullable: false,
        name: 'NOMBRE_FAB',
    })
    nombre: string

    @Column({
        type:'varchar',
        length: 100,
        nullable:false,
        name:'UBICACION_FAB'
    })
    ubicacion: string

    @Column({
        type:'varchar',
        length: 100,
        nullable:false,
        name:'FUNDACION_FAB'
    })
    fundacion: string

    @Column({
        type:'varchar',
        length: 100,
        nullable:false,
        name:'PRESIDENTE_FAB'
    })
    presidente: string

    @Column({
        type:'varchar',
        length: 100,
        nullable:false,
        name:'INGRESOS_FAB'
    })
    ingresos: string

    @Column({
        type:'varchar',
        length: 100,
        nullable:false,
        name:'EMPLEADOS_FAB'
    })
    empleados: string

    @OneToMany(
        type =>ProcesadorEntity,
        procesador => procesador.fkFabricante)
    procesadores: ProcesadorEntity[];
}
