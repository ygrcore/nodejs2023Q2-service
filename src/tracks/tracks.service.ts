import { Injectable, NotFoundException } from '@nestjs/common';
import { Track } from 'src/dto/music';
import * as uuid from 'uuid';

@Injectable()
export class TracksService {
  private tracks: Track[] = [];

  getAllTracks(): Track[] {
    return this.tracks;
  }

  getTrackById(id: string): Track {
    const track = this.tracks.find(t => t.id === id);
    if (!track) {
      throw new NotFoundException(`Track with id ${id} not found`);
    }
    return track;
  }

  createTrack(track: Track): Track {
    const newTrack: Track = {
      ...track,
      id: uuid.v4(),
    }
    this.tracks.push(newTrack);
    return newTrack;
  }

  updateTrack(id: string, updatedTrack: Track): Track {
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
