import {
  Controller,
  Get,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Put,
  Delete,
} from '@nestjs/common';
import { AlbumService } from './album.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/album.entity';

@ApiTags('album')
@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Post()
  @ApiOperation({ summary: 'Create new album' })
  @ApiResponse({ status: 201, description: 'Created album', type: Album })
  @UsePipes(new ValidationPipe())
  @HttpCode(201)
  create(@Body() createAlbumDto: CreateAlbumDto) {
    return this.albumService.create(createAlbumDto);
  }

  @ApiOperation({ summary: 'Get all albums' })
  @ApiResponse({ status: 200, description: 'All albums', type: [Album] })
  @Get()
  findAll() {
    return this.albumService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get album by ID' })
  @ApiResponse({ status: 200, description: 'Found album', type: Album })
  @ApiResponse({ status: 404, description: 'Album not found' })
  @UsePipes(ParseUUIDPipe)
  findOne(@Param('id') id: string) {
    return this.albumService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update album by ID' })
  @ApiResponse({ status: 200, description: 'Updated album', type: Album })
  @ApiResponse({ status: 404, description: 'Album not found' })
  @UsePipes(new ValidationPipe())
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateAlbumDto: UpdateAlbumDto) {
    return this.albumService.update(id, updateAlbumDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete album by ID' })
  @ApiResponse({ status: 204, description: 'Album deleted' })
  @ApiResponse({ status: 404, description: 'Album not found' })
  @HttpCode(204)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.albumService.remove(id);
  }
}
