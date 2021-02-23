import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}

const texto: string = "";
const comillaSimple: string = '';
const entero: number = 1;
const float: number = 1.2;
const estudiante: boolean = true;
const fecha: Date = new Date();
const noDefinido = undefined;
const nulo = null;

class Usuario {
    constructor(public nombre: string,
                public apellido: string) {

    }
}


interface UsuarioInterface {
    nombre: string;
    apellido: string;
    edad?: number; //? opcional undefined
}


let objetoUsuario: UsuarioInterface = {
    nombre: 'Ramses',
    apellido: 'Paredes'
}

objetoUsuario.nombre;
objetoUsuario.apellido;
objetoUsuario.edad;

//console.log(objetoUsuario);

let a ={
    edad:22
}

let b=a;
let c={...a}

b.edad=60;
c.edad=100;

//console.log("A:",a.edad)
//console.log("B:",b.edad)
//console.log("C:",c.edad)



const array1=[1,"ss",null,new Date()]
const array2:number[]=[1,2,3,4,5]
const array3:number[]=[...array2,100]

console.log("array1:",array1)
console.log("array2:",array2)
console.log("array3:",array3)
console.log("array3Push:",array3.push(1))
console.log("array3:",array3)
console.log("array3Pop:",array3.pop())
console.log("array3:",array3)