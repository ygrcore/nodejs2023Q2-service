import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { IAlbum } from 'src/dto/music';
import * as uuid from 'uuid';

@Injectable()
export class AlbumService {
  private albums: IAlbum[] = [];

  create(createAlbumDto: CreateAlbumDto) {
    const newAlbum: IAlbum = {
      ...createAlbumDto,
      id: uuid.v4()
    }
    this.albums.push(newAlbum);

    return newAlbum;
  }

  findAll(): IAlbum[] {
    return this.albums;
  }

  findOne(id: string): IAlbum {
    const album = this.albums.find(a => a.id === id);
    if (!album) {
      throw new NotFoundException(`Album with id ${id} not found`);
    }
    return album;
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto): IAlbum {
    const index = this.albums.findIndex(a => a.id === id);
    const album = this.albums.find(a => a.id === id);

    if (index === -1) {
      throw new NotFoundException(`Album with id ${id} not found`);
    }

    this.albums.splice(index, 1, {...album, ...updateAlbumDto})
    return this.albums[index];
  }

  remove(id: string): void {
    const index = this.albums.findIndex(a => a.id === id);
    if (index === -1) {
      throw new NotFoundException(`Album with id ${id} not found`);
    }
    this.albums.splice(index, 1);
  }
}
