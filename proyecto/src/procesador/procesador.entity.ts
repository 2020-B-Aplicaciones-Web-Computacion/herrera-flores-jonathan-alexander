import {Column,ManyToOne, Entity, PrimaryGeneratedColumn} from "typeorm";
import {FabricanteEntity} from "../fabricante/fabricante.entity";

@Entity('PROCESADOR')
export class ProcesadorEntity{
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        type: 'varchar',
        length: 100,
        nullable: false,
        name: 'NOMBRE_PRO',
    })
    nombre: string

    @Column({
        type: 'varchar',
        length: 100,
        nullable: false,
        name: 'LANZAMIENTO_FAB',
    })
    lanzamiento: string

    @Column({
        type: 'varchar',
        length: 100,
        nullable: false,
        name: 'ARQUITECTURA_FAB',
    })
    arquitectura: string

    @Column({
        type: 'varchar',
        length: 100,
        nullable: false,
        name: 'ZOCALO_FAB',
    })
    zocalo: string

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