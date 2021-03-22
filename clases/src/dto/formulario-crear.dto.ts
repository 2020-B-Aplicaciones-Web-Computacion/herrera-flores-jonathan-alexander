import {
    IsEmail, IsIn,
    IsNotEmpty,
    IsNumber,
    IsNumberString,
    IsOptional, IsPositive,
    IsString,
    Length,
    MaxLength,
    MinLength
} from 'class-validator'
export class FormularioCrearDto {
    @IsNotEmpty()
    @IsString()
    @MinLength(2)
    @MaxLength(80)
    nombre: string;

    @IsNotEmpty()
    @Length(10)
    @IsString()
    @IsNumberString()
    cedula:string;

    @IsNotEmpty()
    @IsEmail()
    correo:string;

    @IsOptional()
    @IsNumber()
    @IsPositive()
    edad: number;

    @IsOptional()
    //@IsBoolean()
    @IsIn([true,false])
    soltero: boolean;
}