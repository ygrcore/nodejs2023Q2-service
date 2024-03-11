import { Injectable, NotFoundException } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { IAlbum } from 'src/dto/music';
import * as uuid from 'uuid';

@Injectable()
export class AlbumService {
  constructor(private dbService: DbService) {}

  create(createAlbumDto: CreateAlbumDto) {
    const newAlbum: IAlbum = {
      ...createAlbumDto,
      id: uuid.v4()
    }

    this.dbService.addAlbum(newAlbum);

    return newAlbum;
  }

  findAll(): IAlbum[] {
    return this.dbService.getAllAlbums();
  }

  findOne(id: string): IAlbum {
    return this.dbService.getAlbumById(id);
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto): IAlbum {
    return this.dbService.updateAlbum(id, updateAlbumDto)
  }

  remove(id: string): void {
    this.dbService.deleteAlbum(id);
  }
}
