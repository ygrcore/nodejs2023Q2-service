import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateAlbumDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ required: false })
  artistId: string | null;

  @IsNotEmpty()
  @IsNumber()
  year: number;
}