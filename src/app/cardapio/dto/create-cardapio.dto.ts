import { IsBoolean, IsDate, IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString} from 'class-validator'
import { isNode } from 'graphql/language/ast'

export class CreateCardapioDto {


    @IsNumber()
    @IsNotEmpty()
    categoria:number

    @IsBoolean()
    @IsNotEmpty()
    statusItem: boolean

    @IsString()
    @IsNotEmpty()
    nomeItem: string

    @IsNumber()
    @IsNotEmpty()
    preco: number 

    @IsString()
    @IsNotEmpty()
    descricao: string

    @IsNumber()
    @IsOptional()
    descricaoStatus: string
  
}
