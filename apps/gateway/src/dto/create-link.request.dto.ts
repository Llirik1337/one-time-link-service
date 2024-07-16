import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsString } from 'class-validator';

@Exclude()
export class CreateLinkRequestDTO {
  @Expose()
  @IsString()
  @ApiProperty({
    example: `example`,
  })
  data: string;
}
