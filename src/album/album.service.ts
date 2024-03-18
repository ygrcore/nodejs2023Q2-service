import { Injectable, NotFoundException } from '@nestjs/common';
import { DbService } from '../db/db.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { v4 as uuidv4 } from 'uuid';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/album.entity';

@Injectable()
export class AlbumService {
  constructor(private db: DbService) {}

  create(createAlbumDto: CreateAlbumDto) {
    const { artistId, ...albumData } = createAlbumDto;
    const newAlbum: Album = {
      ...albumData,
      id: uuidv4(),
      artistId: artistId || null,
    };

    this.db.albums.push(newAlbum);
    return newAlbum;
  }

  findAll() {
    return this.db.albums;
  }

  findOne(id: string) {
    const album = this.db.albums.find((album) => album.id === id);

    if (album === undefined) throw new NotFoundException(`Album with ${id} not found`);

    return album;
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const index = this.db.albums.findIndex((album) => album.id === id);

    if (index === -1) throw new NotFoundException(`Album with ${id} not found`);

    this.db.albums[index] = { ...updateAlbumDto, id };
    return this.db.albums[index];
  }

  remove(id: string) {
    const index = this.db.albums.findIndex((album) => album.id === id);

    if (index === -1) throw new NotFoundException(`Album with ${id} not found`);

    const tracksIndex = this.db.tracks.findIndex(
      (track) => track.albumId === id,
    );
    if (tracksIndex !== -1)
      this.db.tracks[tracksIndex].albumId = null;

    const favsIndex = this.db.favs.albums.findIndex(
      (albumId) => albumId === id,
    );
    if (favsIndex !== -1)
      this.db.favs.albums.splice(favsIndex, 1);

    this.db.albums.splice(index, 1);
    return;
  }
}
