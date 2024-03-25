import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './entities/tracks.entity';
import { Artist } from 'src/artists/entities/artists.entity';
import { Album } from 'src/album/entities/album.entity';

@Injectable()
export class TracksService {
  constructor(
    @InjectRepository(Track) private tracksRepository: Repository<Track>,
    @InjectRepository(Artist)
    private artistsRepository: Repository<Artist>,
    @InjectRepository(Album)
    private albumsRepository: Repository<Album>,
  ) {}

  async create(createTrackDto: CreateTrackDto): Promise<Track> {
    const { name, duration, artistId, albumId } = createTrackDto;

    let album: Album | undefined;
    let artist: Artist | undefined;

    if (albumId) {
      album = await this.albumsRepository.findOne({ where: { id: albumId } });
    }

    if (artistId) {
      artist = await this.artistsRepository.findOne({
        where: { id: artistId },
      });
    }

    const newTrack = new Track();
    newTrack.name = name;
    newTrack.duration = duration;
    newTrack.artistId = artist === undefined ? null : artist;
    newTrack.albumId = album === undefined ? null : album;

    await this.tracksRepository.save(newTrack);
    return newTrack;
  }

  async findAll(): Promise<Track[]> {
    return await this.tracksRepository.find();
  }

  async findOne(id: string): Promise<Track> {
    const track = await this.tracksRepository.findOneBy({ id });

    if (!track) throw new NotFoundException(`Track with ${id} is not found`);

    return track;
  }

  async update(id: string, updateTrackDto: UpdateTrackDto): Promise<Track> {
    const { name, duration, artistId, albumId } = updateTrackDto;
    const track = await this.findOne(id);

    if (!track) throw new NotFoundException(`Track with ${id} not found`);

    if (artistId) {
      const artist = await this.artistsRepository.findOne({where: {id: artistId}});
      if (!artist) {
        track.artistId = null;
      }
      track.artistId = artist;
    }

    if (albumId) {
      const album = await this.albumsRepository.findOne({where: {id: albumId}});
      if (!album) {
        track.albumId = null;
      }
      track.albumId = album;
    }

    track.name = name;
    track.duration = duration;

    await this.tracksRepository.save(track);

    return track;
  }

  async remove(id: string): Promise<void> {
    const track = await this.findOne(id);

    if (!track) throw new NotFoundException(`Track with ${id} not found`);

    await this.tracksRepository.remove(track);

    // const favsIndex = this.db.favs.tracks.findIndex(
    //   (trackId) => trackId === id,
    // );
    // if (favsIndex !== -1) this.db.favs.tracks.splice(favsIndex, 1);

    // this.db.tracks.splice(index, 1);
    // return;
  }
}
