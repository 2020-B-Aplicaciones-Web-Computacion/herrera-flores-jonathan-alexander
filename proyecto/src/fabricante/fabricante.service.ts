import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {FabricanteEntity} from "./fabricante.entity";
import {Repository} from "typeorm";

@Injectable()
export class FabricanteService{
    constructor(

        @InjectRepository(FabricanteEntity)
        public fabricanteEntity:Repository<FabricanteEntity>
    ){

    }
}