import { PartialType } from '@nestjs/swagger';
import { CreateBonusGarcomDto } from './create-bonus-garcom.dto';

export class UpdateBonusGarcomDto extends PartialType(CreateBonusGarcomDto) {}
