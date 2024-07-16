import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsString } from 'class-validator';

@Exclude()
export class GetLinkRequestDTO {
  @Expose()
  @IsString()
  @ApiProperty({
    example: `a5e501c2-a481-47d4-8ec7-1e3a791d0945`,
  })
  id: string;
}
