import { Injectable, NotFoundException } from '@nestjs/common';
import { DbService } from '../db/db.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { v4 as uuidv4 } from 'uuid';
import { UpdateTrackDto } from './dto/update-track.dto';

@Injectable()
export class TracksService {
  constructor(private db: DbService) {}

  create(createTrackDto: CreateTrackDto) {
    const { artistId, albumId } = createTrackDto;
    const newTrack = {
      ...createTrackDto,
      id: uuidv4(),
      artistId: artistId || null,
      albumId: albumId || null,
    };

    this.db.tracks.push(newTrack);
    return newTrack;
  }

  findAll() {
    return this.db.tracks;
  }

  findOne(id: string) {
    const track = this.db.tracks.find((track) => track.id === id);

    if (track === undefined) throw new NotFoundException(`Track with ${id} not found`);

    return track;
  }

  update(id: string, updateTrackDto: UpdateTrackDto) {
    const index = this.db.tracks.findIndex((track) => track.id === id);

    if (index === -1) throw new NotFoundException(`Track with ${id} not found`);

    this.db.tracks[index] = { ...updateTrackDto, id };
    return this.db.tracks[index];
  }

  remove(id: string) {
    const index = this.db.tracks.findIndex((track) => track.id === id);

    if (index === -1) throw new NotFoundException(`Track with ${id} not found`);

    const favsIndex = this.db.favs.tracks.findIndex(
      (trackId) => trackId === id,
    );
    if (favsIndex !== -1)
      this.db.favs.tracks.splice(favsIndex, 1);

    this.db.tracks.splice(index, 1);
    return;
  }
}
