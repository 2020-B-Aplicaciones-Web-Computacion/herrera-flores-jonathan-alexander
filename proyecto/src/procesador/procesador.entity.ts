import {Column, ManyToOne, Entity, PrimaryGeneratedColumn} from "typeorm";
import {FabricanteEntity} from "../fabricante/fabricante.entity";
import {
    IsEmail,
    IsIn,
    IsNotEmpty,
    IsNumber,
    IsNumberString,
    IsOptional,
    IsPositive,
    IsString,
    Length,
    MaxLength,
    MinLength
} from 'class-validator'

@Entity('PROCESADOR')
export class ProcesadorEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Length(5,100)
    @IsString()
    @IsNotEmpty()
    @Column({
        type: 'varchar',
        length: 100,
        nullable: false,
        name: 'NOMBRE_PRO',
    })
    nombre: string

    @Length(5,100)
    @IsString()
    @IsNotEmpty()
    @Column({
        type: 'varchar',
        length: 100,
        nullable: false,
        name: 'LANZAMIENTO_FAB',
    })
    lanzamiento: string

    @Length(5,100)
    @IsString()
    @IsNotEmpty()
    @Column({
        type: 'varchar',
        length: 100,
        nullable: false,
        name: 'ARQUITECTURA_FAB',
    })
    arquitectura: string

    @Length(5,100)
    @IsString()
    @IsNotEmpty()
    @Column({
        type: 'varchar',
        length: 100,
        nullable: false,
        name: 'ZOCALO_FAB',
    })
    zocalo: string

    @Length(5,100)
    @IsString()
    @IsNotEmpty()
    @Column({
        type: 'varchar',
        length: 100,
        nullable: false,
        name: 'NUCLEOS_FAB',
    })
    nucleos: string

    @ManyToOne(
        type => FabricanteEntity,
        fabricante => fabricante.procesadores)
    fkFabricante: FabricanteEntity;
}