import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Artist } from 'src/artists/entities/artists.entity';
import { Album } from 'src/album/entities/album.entity';
import { Track } from 'src/tracks/entities/tracks.entity';
import { Fav } from './entities/fav.entity';

@Injectable()
export class FavsService {
  constructor(
    @InjectRepository(Artist)
    private readonly artistRepository: Repository<Artist>,
    @InjectRepository(Album)
    private readonly albumRepository: Repository<Album>,
    @InjectRepository(Track)
    private readonly trackRepository: Repository<Track>,
    @InjectRepository(Fav)
    private readonly favoritesRepository: Repository<Fav>,
  ) {}

  async addArtistToFavorites(artistId: string): Promise<void> {
    const artist = await this.artistRepository.findOne({where: {id: artistId}});
    if (!artist) {
      throw new NotFoundException(`Artist with ID ${artistId} not found`);
    }
    await this.favoritesRepository.save({ artist });
  }

  async addAlbumToFavorites(albumId: string): Promise<void> {
    const album = await this.albumRepository.findOne({where: {id: albumId}});
    if (!album) {
      throw new NotFoundException(`Album with ID ${albumId} not found`);
    }
    await this.favoritesRepository.save({ album });
  }

  async addTrackToFavorites(trackId: string): Promise<void> {
    const track = await this.trackRepository.findOne({where: {id: trackId}});
    if (!track) {
      throw new NotFoundException(`Track with ID ${trackId} not found`);
    }
    await this.favoritesRepository.save({ track });
  }

  async getAllFavorites(): Promise<Fav[]> {
    return await this.favoritesRepository.find({
      relations: ['artist', 'album', 'track'],
    });
  }

  async removeArtistFromFavorites(artistId: string): Promise<void> {
    const favorite = await this.favoritesRepository.findOne({
      where: { artist: { id: artistId } },
    });
    if (!favorite) {
      throw new NotFoundException(`Favorite artist with ID ${artistId} not found`);
    }
    await this.favoritesRepository.delete(favorite.id);
  }

  async removeAlbumFromFavorites(albumId: string): Promise<void> {
    const favorite = await this.favoritesRepository.findOne({
      where: { album: { id: albumId } },
    });
    if (!favorite) {
      throw new NotFoundException(`Favorite album with ID ${albumId} not found`);
    }
    await this.favoritesRepository.delete(favorite.id);
  }

  async removeTrackFromFavorites(trackId: string): Promise<void> {
    const favorite = await this.favoritesRepository.findOne({
      where: { track: { id: trackId } },
    });
    if (!favorite) {
      throw new NotFoundException(`Favorite track with ID ${trackId} not found`);
    }
    await this.favoritesRepository.delete(favorite.id);
  }
}
