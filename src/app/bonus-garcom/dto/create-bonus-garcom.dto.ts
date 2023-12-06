import { IsBoolean, IsDate, IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString, isNotEmpty } from 'class-validator'
import { isNode } from 'graphql/language/ast'

export class CreateBonusGarcomDto {

    @IsNumber()
    @IsNotEmpty()
    idBonus: number

    @IsDateString()
    @IsNotEmpty()
    diaReferencia: Date 
    
    @IsNumber()
    @IsNotEmpty()
    porcentagem: number

    @IsNumber()
    @IsNotEmpty()
    idPedido: number

    @IsNumber()
    @IsNotEmpty()
    valor: number
}
