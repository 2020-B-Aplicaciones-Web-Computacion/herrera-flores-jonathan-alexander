import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {ProcesadorEntity} from "../procesador/procesador.entity";
import {IsNotEmpty, IsString, Length} from "class-validator";

@Entity('FABRICANTE')
export class FabricanteEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Length(5,100)
    @IsString()
    @IsNotEmpty()
    @Column({
        type: 'varchar',
        length: 100,
        nullable: false,
        name: 'NOMBRE_FAB',
    })
    nombre: string

    @Length(5,100)
    @IsString()
    @IsNotEmpty()
    @Column({
        type:'varchar',
        length: 100,
        nullable:false,
        name:'UBICACION_FAB'
    })
    ubicacion: string

    @Length(5,100)
    @IsString()
    @IsNotEmpty()
    @Column({
        type:'varchar',
        length: 100,
        nullable:false,
        name:'FUNDACION_FAB'
    })
    fundacion: string

    @Length(5,100)
    @IsString()
    @IsNotEmpty()
    @Column({
        type:'varchar',
        length: 100,
        nullable:false,
        name:'PRESIDENTE_FAB'
    })
    presidente: string

    @Length(5,100)
    @IsString()
    @IsNotEmpty()
    @Column({
        type:'varchar',
        length: 100,
        nullable:false,
        name:'INGRESOS_FAB'
    })
    ingresos: string

    @Length(5,100)
    @IsString()
    @IsNotEmpty()
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
