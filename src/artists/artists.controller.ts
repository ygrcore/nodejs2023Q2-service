import {
  Controller,
  Get,
  Post,
  Body,
  HttpCode,
  UsePipes,
  ValidationPipe,
  Param,
  ParseUUIDPipe,
  Put,
  Delete,
} from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entities/artists.entity';

@ApiTags('artist')
@Controller('artist')
export class ArtistsController {
  constructor(private readonly artistsService: ArtistsService) {}

  @Post()
  @ApiOperation({ summary: 'Create new artist' })
  @ApiResponse({
    status: 201,
    description: 'Created artist',
    type: Artist
  })
  @ApiResponse({
    status: 400,
    description:
      'Required fields are missed',
  })
  @HttpCode(201)
  @UsePipes(new ValidationPipe())
  create(@Body() createArtistDto: CreateArtistDto) {
    return this.artistsService.create(createArtistDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all artists' })
  @ApiResponse({
    status: 200,
    description: 'All artists',
    type: [Artist]
  })
  findAll() {
    return this.artistsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get artist by ID' })
  @ApiResponse({
    status: 200,
    description: 'Found artist',
  })
  @ApiResponse({
    status: 400,
    description: 'ArtistId is invalid (not uuid)',
  })
  @ApiResponse({
    status: 404,
    description:
      'Artist not found',
  })
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.artistsService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update artist by ID' })
  @ApiResponse({
    status: 200,
    description: 'Updated artist',
  })
  @ApiResponse({
    status: 400,
    description: 'ArtistId is invalid (not uuid)',
  })
  @ApiResponse({
    status: 404,
    description:
      'Artist not found',
  })
  @UsePipes(new ValidationPipe())
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateArtistDto: UpdateArtistDto,
  ) {
    return this.artistsService.update(id, updateArtistDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete artist by ID' })
  @ApiResponse({
    status: 204,
    description: 'Artist deleted',
  })
  @ApiResponse({
    status: 400,
    description: 'ArtistId is invalid (not uuid)',
  })
  @ApiResponse({
    status: 404,
    description:
      'Artist not found',
  })
  @HttpCode(204)
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.artistsService.remove(id);
  }
}
