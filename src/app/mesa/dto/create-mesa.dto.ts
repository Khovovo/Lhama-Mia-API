import { IsBoolean, IsDate, IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString, isNotEmpty } from 'class-validator'
import { isNode } from 'graphql/language/ast'

export class CreateMesaDto {

    @IsNumber()
    @IsNotEmpty()
    numeroMesa: number

    @IsBoolean()
    @IsOptional()
    status: boolean
}
