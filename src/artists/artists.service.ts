import { Injectable, NotFoundException } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { IArtist } from 'src/dto/music';
import * as uuid from 'uuid';

@Injectable()
export class ArtistsService {
  constructor(private readonly dbService: DbService) {}

  getAllArtists(): IArtist[] {
    return this.dbService.db.artists;
  }

  getArtistById(id: string): IArtist {
    const artist = this.dbService.db.artists.find(a => a.id === id);
    if (!artist) {
      throw new NotFoundException(`Artist with id ${id} not found`);
    }
    return artist;
  }

  createArtist(artist: IArtist): IArtist {
    const newArtist: IArtist = {
      ...artist,
      id: uuid.v4()
    }

    this.dbService.db.artists.push(newArtist);
    return newArtist;
  }

  updateArtist(id: string, updatedArtist: IArtist): IArtist {
    const artistIndex = this.dbService.db.artists.findIndex(a => a.id === id);
    const artist = this.dbService.db.artists.find(a => a.id === id);

    if (artistIndex === -1) {
      throw new NotFoundException(`Artist with id ${id} not found`);
    }

    this.dbService.db.artists.splice(artistIndex, 1, {...artist, ...updatedArtist});
    return this.dbService.db.artists[artistIndex];
  }

  deleteArtist(id: string): void {
    const artistIndex = this.dbService.db.artists.findIndex(a => a.id === id);

    if (artistIndex === -1) {
      throw new NotFoundException(`Artist with id ${id} not found`);
    }
    this.dbService.db.artists.splice(artistIndex, 1);
  }
}
