import { IsBoolean, IsDate, IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString, isNotEmpty } from 'class-validator'
import { isNode } from 'graphql/language/ast'

export class CreatePedidoDto {

    @IsNumber()
    @IsNotEmpty()
    quantidade: number

    @IsBoolean()
    @IsOptional()
    status: boolean

    @IsNumber()
    @IsNotEmpty()
    Colaborador: number

    @IsNumber()
    @IsNotEmpty()
    idComanda: number

    @IsDateString()
    @IsNotEmpty()
    dataPedido: Date

    @IsString()
    @IsOptional()
    andamento: string
    
    @IsNumber()
    @IsNotEmpty()
    idItem: number
}
