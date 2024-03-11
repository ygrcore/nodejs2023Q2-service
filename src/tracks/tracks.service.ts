import { Injectable, NotFoundException } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { ITrack } from 'src/dto/music';
import * as uuid from 'uuid';

@Injectable()
export class TracksService {
  constructor(private readonly dbService: DbService) {}

  getAllTracks(): ITrack[] {
    return this.dbService.db.tracks;
  }

  getTrackById(id: string): ITrack {
    const track = this.dbService.db.tracks.find(t => t.id === id);
    if (!track) {
      throw new NotFoundException(`Track with id ${id} not found`);
    }
    return track;
  }

  createTrack(track: ITrack): ITrack {
    const newTrack: ITrack = {
      ...track,
      id: uuid.v4(),
    }
    this.dbService.db.tracks.push(newTrack);
    return newTrack;
  }

  updateTrack(id: string, updatedTrack: ITrack): ITrack {
    const trackIndex = this.dbService.db.tracks.findIndex(t => t.id === id);
    const track = this.dbService.db.tracks.find(t => t.id === id);

    if (trackIndex === -1) {
      throw new NotFoundException(`Track with id ${id} not found`);
    }
    this.dbService.db.tracks.splice(trackIndex, 1, {...track, ...updatedTrack});
    return this.dbService.db.tracks[trackIndex];
  }

  deleteTrack(id: string): void {
    const trackIndex = this.dbService.db.tracks.findIndex(t => t.id === id);
    if (trackIndex === -1) {
      throw new NotFoundException(`Track with id ${id} not found`);
    }
    this.dbService.db.tracks.splice(trackIndex, 1);
  }
}
