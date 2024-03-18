import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateTrackDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ required: false })
  artistId: string | null;

  @ApiProperty({ required: false })
  albumId: string | null;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  duration: number;
}