import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { DbService } from '../db/db.service';
import { v4 as uuidv4 } from 'uuid';
import { UpdateArtistDto } from './dto/update-artist.dto';

@Injectable()
export class ArtistsService {
  constructor(private db: DbService) {}

  create(createArtistDto: CreateArtistDto) {
    const newArtist = {
      id: uuidv4(),
      ...createArtistDto,
    };

    this.db.artists.push(newArtist);

    return newArtist;
  }

  findAll() {
    return this.db.artists;
  }

  findOne(id: string) {
    const artist = this.db.artists.find((artist) => artist.id === id);

    if (artist === undefined) throw new NotFoundException(`Artist with ${id} not found`);

    return artist;
  }

  update(id: string, updateArtistDto: UpdateArtistDto) {
    const index = this.db.artists.findIndex((artist) => artist.id === id);
    if (index === -1) {
      throw new NotFoundException(`Artist with ${id} not found`);
    } else {
      this.db.artists[index] = { ...updateArtistDto, id };
      return this.db.artists[index];
    }
  }

  remove(id: string) {
    const index = this.db.artists.findIndex((artist) => artist.id === id);

    if (index === -1) {
      throw new NotFoundException(`Artist with ${id} not found`);
    } else {
      this.db.artists.splice(index, 1);

      const tracksIndex = this.db.tracks.findIndex(
        (track) => track.artistId === id,
      );
      if (tracksIndex !== -1)
        this.db.tracks[tracksIndex].artistId = null;

      const albumsIndex = this.db.albums.findIndex(
        (album) => album.artistId === id,
      );
      if (albumsIndex !== -1)
        this.db.albums[albumsIndex].artistId = null;

      const favsIndex = this.db.favs.artists.findIndex(
        (artistId) => artistId === id,
      );
      if (favsIndex !== -1) this.db.artists.splice(favsIndex, 1);

      return;
    }
  }
}
