import { Injectable, NotFoundException } from '@nestjs/common';
import { ITrack } from 'src/dto/music';
import * as uuid from 'uuid';

@Injectable()
export class TracksService {
  private tracks: ITrack[] = [];

  getAllTracks(): ITrack[] {
    return this.tracks;
  }

  getTrackById(id: string): ITrack {
    const track = this.tracks.find(t => t.id === id);
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
    this.tracks.push(newTrack);
    return newTrack;
  }

  updateTrack(id: string, updatedTrack: ITrack): ITrack {
    const trackIndex = this.tracks.findIndex(t => t.id === id);
    const track = this.tracks.find(t => t.id === id);

    if (trackIndex === -1) {
      throw new NotFoundException(`Track with id ${id} not found`);
    }
    this.tracks.splice(trackIndex, 1, {...track, ...updatedTrack});
    return this.tracks[trackIndex];
  }

  deleteTrack(id: string): void {
    const trackIndex = this.tracks.findIndex(t => t.id === id);
    if (trackIndex === -1) {
      throw new NotFoundException(`Track with id ${id} not found`);
    }
    this.tracks.splice(trackIndex, 1);
  }
}
