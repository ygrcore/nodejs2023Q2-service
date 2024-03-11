import { Injectable, NotFoundException } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { ITrack } from 'src/dto/music';
import * as uuid from 'uuid';

@Injectable()
export class TracksService {
  constructor(private dbService: DbService) {}

  getAllTracks(): ITrack[] {
    return this.dbService.getAllTracks();
  }

  getTrackById(id: string): ITrack {
    return this.dbService.getTrackById(id);
  }

  createTrack(track: ITrack): ITrack {
    const newTrack: ITrack = {
      ...track,
      id: uuid.v4(),
    }

    this.dbService.addTrack(newTrack);
    return newTrack;
  }

  updateTrack(id: string, updatedTrack: ITrack): ITrack {
    return this.dbService.updateTrack(id, updatedTrack);
  }

  deleteTrack(id: string): void {
    this.dbService.deleteTrack(id);
  }
}
