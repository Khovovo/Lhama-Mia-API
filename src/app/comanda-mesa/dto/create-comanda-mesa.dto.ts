import { IsBoolean, IsDate, IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString, isNotEmpty } from 'class-validator'
import { isNode } from 'graphql/language/ast'

export class CreateComandaMesaDto {

    @IsNumber()
    @IsNotEmpty()
    idMesa: number

    @IsBoolean()
    @IsOptional()
    status: boolean

    @IsString()
    @IsOptional()
    observacoes: string
}
