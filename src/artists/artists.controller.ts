import { Controller, Get, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { IArtist } from 'src/dto/music';

@Controller('artist')
export class ArtistsController {
  constructor(private artistsService: ArtistsService) {}

  @Get()
  getAllArtists() {
    return this.artistsService.getAllArtists();
  }

  @Get(':id')
  getArtistById(@Param('id') id: string) {
    return this.artistsService.getArtistById(id);
  }

  @Post()
  createArtist(@Body() artist: IArtist) {
    return this.artistsService.createArtist(artist)
  }

  @Put(':id')
  updatedArtist(@Param('id') id: string, @Body() artist: IArtist) {
    return this.artistsService.updateArtist(id, artist);
  }

  @Delete(':id')
  deleteArtist(@Param('id') id: string) {
    return this.artistsService.deleteArtist(id);
  }
}
