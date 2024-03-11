import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFavDto } from './dto/create-fav.dto';
import { UpdateFavDto } from './dto/update-fav.dto';
import { DbService } from 'src/db/db.service';

@Injectable()
export class FavsService {
  constructor(private dbService: DbService) {}

  findAll() {
    return this.dbService.getAllFavorites();
  }

  addTrack(id: string) {
    const track = this.dbService.addTrackToFavorites(id);

    this.dbService.addToFavorites('tracks', track);
  }

  removeTrack(id: string) {
    this.dbService.deleteFromFavorites('tracks', id);
  }

  addArtist(id: string) {
    const artist = this.dbService.addArtistToFavorites(id);

    this.dbService.addToFavorites('artists', artist);
  }

  removeArtist(id: string) {
    this.dbService.deleteFromFavorites('artists', id);
  }

  addAlbum(id: string) {
    const album = this.dbService.addAlbumToFavorites(id);

    this.dbService.addToFavorites('albums', album);
  }

  removeAlbum(id: string) {
    this.dbService.deleteFromFavorites('albums', id);
  }
}
