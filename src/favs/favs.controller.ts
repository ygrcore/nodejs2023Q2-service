import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FavsService } from './favs.service';
import { CreateFavDto } from './dto/create-fav.dto';
import { UpdateFavDto } from './dto/update-fav.dto';

@Controller('favs')
export class FavsController {
  constructor(private readonly favsService: FavsService) {}

  @Get()
  findAll() {
    return this.favsService.findAll();
  }

  @Post('/track/:id')
  addTrack(@Param('id') trackId: string): void {
    this.favsService.addTrack(trackId);
  }

  @Delete('/track/:id')
  removeTrack(@Param('id') trackId: string): void {
    this.favsService.removeTrack(trackId);
  }

  @Post('/artist/:id')
  addArtist(@Param('id') artistId: string): void {
    this.favsService.addArtist(artistId);
  }

  @Delete('/artist/:id')
  removeArtist(@Param('id') artistId: string): void {
    this.favsService.removeArtist(artistId);
  }

  @Post('/album/:id')
  addAlbum(@Param('id') albumId: string): void {
    this.favsService.addAlbum(albumId);
  }

  @Delete('/album/:id')
  removeAlbum(@Param('id') albumId: string): void {
    this.favsService.removeAlbum(albumId);
  }
}
