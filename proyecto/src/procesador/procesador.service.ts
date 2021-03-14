import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {ProcesadorEntity} from "./procesador.entity";
import {Repository} from "typeorm";

@Injectable()
export class ProcesadorService{
    constructor(
        @InjectRepository(ProcesadorEntity)
        public procesadorEntity: Repository<ProcesadorEntity>
    ){

    }
}