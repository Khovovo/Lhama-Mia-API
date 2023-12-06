import { PartialType } from '@nestjs/swagger';
import { CreateComandaMesaDto } from './create-comanda-mesa.dto';

export class UpdateComandaMesaDto extends PartialType(CreateComandaMesaDto) {}
