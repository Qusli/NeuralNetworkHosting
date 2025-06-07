import { PartialType } from '@nestjs/swagger';
import { CreateHostingDto } from './create-hosting.dto';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateHostingDto extends PartialType(CreateHostingDto) {
    @IsNotEmpty()
    @IsNumber()
    id: number
}
