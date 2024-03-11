import { Injectable, NotFoundException } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { IArtist } from 'src/dto/music';
import * as uuid from 'uuid';

@Injectable()
export class ArtistsService {
  constructor(private dbService: DbService) {}

  getAllArtists(): IArtist[] {
    return this.dbService.getAllArtists();
  }

  getArtistById(id: string): IArtist {
    return this.dbService.getArtistById(id);
  }

  createArtist(artist: IArtist): IArtist {
    const newArtist: IArtist = {
      ...artist,
      id: uuid.v4()
    }

    this.dbService.addArtist(newArtist);
    return newArtist;
  }

  updateArtist(id: string, updatedArtist: IArtist): IArtist {
    return this.dbService.updateArtist(id, updatedArtist);
  }

  deleteArtist(id: string): void {
    this.dbService.deleteArtist(id);
  }
}
