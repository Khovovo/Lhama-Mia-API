import { IsBoolean, IsDate, IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString, isNotEmpty } from 'class-validator'
import { isNode } from 'graphql/language/ast'

export class CreateCategoriaDto {

    @IsString()
    @IsNotEmpty()
    descricao: string

}
