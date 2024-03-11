import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFavDto } from './dto/create-fav.dto';
import { UpdateFavDto } from './dto/update-fav.dto';
import { DbService } from 'src/db/db.service';

@Injectable()
export class FavsService {
  constructor(private readonly dbService: DbService) {}

  findAll() {
    return this.dbService.db.favorites;
  }

  addTrack(id: string) {
    const track = this.dbService.db.tracks.find(t => t.id === id);
    if (!track) {
      throw new NotFoundException(`Track with id ${id} not found`);
    }

    this.dbService.addToFavorites('tracks', track);
  }

  removeTrack(id: string) {
    this.dbService.deleteFromFavorites('tracks', id);
  }

  addArtist(id: string) {
    const artist = this.dbService.db.tracks.find(a => a.id === id);
    if (!artist) {
      throw new NotFoundException(`Artist with id ${id} not found`);
    }

    this.dbService.addToFavorites('artists', artist);
  }

  removeArtist(id: string) {
    this.dbService.deleteFromFavorites('artists', id);
  }

  addAlbum(id: string) {
    const album = this.dbService.db.albums.find(a => a.id === id);
    if (!album) {
      throw new NotFoundException(`Album with id ${id} not found`);
    }

    this.dbService.addToFavorites('albums', album);
  }

  removeAlbum(id: string) {
    this.dbService.deleteFromFavorites('albums', id);
  }
}
