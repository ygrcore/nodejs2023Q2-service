import {
  Controller,
  Get,
  Post,
  Delete,
  HttpCode,
  Param,
  ParseUUIDPipe,
} from '@nestjs/common';
import { FavsService } from './favs.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('favs')
@Controller('favs')
export class FavsController {
  constructor(private readonly favsService: FavsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all favorites' })
  @ApiResponse({ status: 200, description: 'All favorites' })
  findAll() {
    return this.favsService.getAllFavorites();
  }

  @Post('artist/:id')
  @ApiOperation({ summary: 'Add artist to favorites' })
  @ApiResponse({ status: 201, description: 'Added artist to favorites' })
  @ApiResponse({ status: 400, description: 'Invalid id (not uuid)' })
  @ApiResponse({ status: 422, description: 'Artist with id doesn`t exist' })
  @HttpCode(201)
  addArtistToFavorites(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.favsService.addArtistToFavorites(id);
  }

  @Post('album/:id')
  @ApiOperation({ summary: 'Add album to favorites' })
  @ApiResponse({ status: 201, description: 'Added album to favorites' })
  @ApiResponse({ status: 400, description: 'Invalid id (not uuid)' })
  @ApiResponse({ status: 422, description: 'Album with id doesn`t exist' })
  @HttpCode(201)
  addAlbumToFavorites(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.favsService.addAlbumToFavorites(id);
  }

  @Post('track/:id')
  @ApiOperation({ summary: 'Add track to favorites' })
  @ApiResponse({ status: 201, description: 'Added track to favorites' })
  @ApiResponse({ status: 400, description: 'Invalid id (not uuid)' })
  @ApiResponse({ status: 422, description: 'Track with id doesn`t exist' })
  @HttpCode(201)
  addTrackToFavorites(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.favsService.addTrackToFavorites(id);
  }

  @Delete('artist/:id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Delete artist from favorites' })
  @ApiResponse({ status: 204, description: 'Deleted artist from favorites' })
  @ApiResponse({ status: 400, description: 'Invalid id (not uuid)' })
  @ApiResponse({ status: 404, description: 'Artist not found in favorites' })
  removeArtistFromFavorites(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.favsService.removeArtistFromFavorites(id);
  }

  @Delete('album/:id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Delete album from favorites' })
  @ApiResponse({ status: 204, description: 'Deleted album from favorites' })
  @ApiResponse({ status: 400, description: 'Invalid id (not uuid)' })
  @ApiResponse({ status: 404, description: 'Album not found in favorites' })
  removeAlbumFromFavorites(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.favsService.removeAlbumFromFavorites(id);
  }

  @Delete('track/:id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Delete track from favorites' })
  @ApiResponse({ status: 204, description: 'Deleted track from favorites' })
  @ApiResponse({ status: 400, description: 'Invalid id (not uuid)' })
  @ApiResponse({ status: 404, description: 'Track not found in favorites' })
  removeTrackFromFavorites(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.favsService.removeTrackFromFavorites(id);
  }
}
