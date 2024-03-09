import { Injectable, NotFoundException } from '@nestjs/common';
import { Artist } from 'src/dto/music';
import * as uuid from 'uuid';

@Injectable()
export class ArtistsService {
  private artists: Artist[] = [];

  getAllArtists(): Artist[] {
    return this.artists;
  }

  getArtistById(id: string): Artist {
    const artist = this.artists.find(a => a.id === id);
    if (!artist) {
      throw new NotFoundException(`Artist with id ${id} not found`);
    }
    return artist;
  }

  createArtist(artist: Artist): Artist {
    const newArtist: Artist = {
      ...artist,
      id: uuid.v4()
    }

    this.artists.push(newArtist);
    return newArtist;
  }

  updateArtist(id: string, updatedArtist: Artist): Artist {
    const artistIndex = this.artists.findIndex(a => a.id === id);
    const artist = this.artists.find(a => a.id === id);

    if (artistIndex === -1) {
      throw new NotFoundException(`Artist with id ${id} not found`);
    }

    this.artists.splice(artistIndex, 1, {...artist, ...updatedArtist});
    return this.artists[artistIndex];
  }

  deleteArtist(id: string): void {
    const artistIndex = this.artists.findIndex(a => a.id === id);

    if (artistIndex === -1) {
      throw new NotFoundException(`Artist with id ${id} not found`);
    }
    this.artists.splice(artistIndex, 1);
  }
}
