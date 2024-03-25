import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/album.entity';
import { Artist } from 'src/artists/entities/artists.entity';

@Injectable()
export class AlbumService {
  constructor(
    @InjectRepository(Album)
    private albumsRepository: Repository<Album>,
    @InjectRepository(Artist)
    private artistsRepository: Repository<Artist>,
  ) {}

  async create(createAlbumDto: CreateAlbumDto): Promise<Album> {
    const { artistId, name, year } = createAlbumDto;

    let artist: Artist | undefined;

    if (artistId) {
      artist = await this.artistsRepository.findOne({ where: { id: artistId } });
    }

    const newAlbum = new Album();

    newAlbum.artistId = artist === undefined ? null : artist;
    newAlbum.name = name;
    newAlbum.year = year

    await this.albumsRepository.save(newAlbum);
    return newAlbum;
  }

  async findAll(): Promise<Album[]> {
    return await this.albumsRepository.find();
  }

  async findOne(id: string): Promise<Album> {
    const album = await this.albumsRepository.findOneBy({id});

    if (!album) throw new NotFoundException(`Album with ${id} not found`);

    return album;
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const { artistId, name, year } = updateAlbumDto;

    const album = await this.findOne(id);

    if (!album) throw new NotFoundException(`Album with ${id} not found`);

    const artist = artistId ? await this.artistsRepository.findOneBy({id: artistId}) : null;

    album.name = name;
    album.year = year;
    album.artistId = artist;

    await this.albumsRepository.save(album);

    const res = {
      ...album,
      artistId: album.artistId.id
    }
    return res;
  }

  async remove(id: string): Promise<void> {
    const album = await this.findOne(id);

    if (!album) throw new NotFoundException(`Album with ${id} not found`);

    await this.albumsRepository.remove(album);
    // const index = this.db.albums.findIndex((album) => album.id === id);

    // if (index === -1) throw new NotFoundException(`Album with ${id} not found`);

    // const tracksIndex = this.db.tracks.findIndex(
    //   (track) => track.albumId === id,
    // );
    // if (tracksIndex !== -1)
    //   this.db.tracks[tracksIndex].albumId = null;

    // const favsIndex = this.db.favs.albums.findIndex(
    //   (albumId) => albumId === id,
    // );
    // if (favsIndex !== -1)
    //   this.db.favs.albums.splice(favsIndex, 1);

    // this.db.albums.splice(index, 1);
    // return;
  }
}
