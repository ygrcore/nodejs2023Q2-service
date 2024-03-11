import { Injectable, NotFoundException } from '@nestjs/common';
import { ITrack, IAlbum, IArtist } from 'src/dto/music';
import { IDatabase } from 'src/dto/dbase';
import { IUser } from 'src/dto/user';

@Injectable()
export class DbService {
  db: IDatabase = {
    users: [
      {
        id: 'c973c927-1d2a-47bd-a65c-02d62d06594c',
        version: 1,
        createdAt: 1710149665242,
        updatedAt: 1710149665242,
        login: 'string',
        password: 'string'
      }
    ],
    artists: [
      {
        id: '3e49a59f-e6f4-49e7-a17b-02d62d06594c',
        name: 'Tester',
        grammy: false,
      }
    ],
    tracks: [
      {
        id: '3e49a59f-e6f4-49e7-a17b-70546c28e873',
        name: 'Test',
        artistId: '3e49a59f-e6f4-49e7-a17b-02d62d06594c',
        albumId: null,
        duration: 2,
      }
    ],
    albums: [],
    favorites: {
      artists: [],
      albums: [],
      tracks: [],
    },
  };

  getAllUsers(){
    return this.db.users
  }

  getUserById(id: string) {
    const user = this.db.users.find(u => u.id === id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }

  addUser(user: IUser) {
    this.db.users.push(user);
  }

  deleteUser(id: string) {
    const index = this.db.users.findIndex(u => u.id === id);
    if (index === -1) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    this.db.users.splice(index, 1);
  }

  getAllTracks() {
    return this.db.tracks;
  }

  getTrackById(id: string): ITrack {
    const track = this.db.tracks.find(t => t.id === id);
    if (!track) {
      throw new NotFoundException(`Track with id ${id} not found`);
    }
    return track;
  }

  addTrack(track: ITrack) {
    this.db.tracks.push(track);
    return track;
  }

  updateTrack(id: string, updatedTrack: ITrack): ITrack {
    const trackIndex = this.db.tracks.findIndex(t => t.id === id);
    const track = this.db.tracks.find(t => t.id === id);

    if (trackIndex === -1) {
      throw new NotFoundException(`Track with id ${id} not found`);
    }
    this.db.tracks.splice(trackIndex, 1, {...track, ...updatedTrack});
    return this.db.tracks[trackIndex];
  }

  deleteTrack(id: string): void {
    const trackIndex = this.db.tracks.findIndex(t => t.id === id);
    if (trackIndex === -1) {
      throw new NotFoundException(`Track with id ${id} not found`);
    }
    this.db.tracks.splice(trackIndex, 1);
  }

  getAllArtists(): IArtist[] {
    return this.db.artists;
  }

  addArtist(artist: IArtist) {
    this.db.artists.push(artist);
  }

  updateArtist(id: string, updatedArtist: IArtist): IArtist {
    const artistIndex = this.db.artists.findIndex(a => a.id === id);
    const artist = this.db.artists.find(a => a.id === id);

    if (artistIndex === -1) {
      throw new NotFoundException(`Artist with id ${id} not found`);
    }

    this.db.artists.splice(artistIndex, 1, {...artist, ...updatedArtist});
    return this.db.artists[artistIndex];
  }

  deleteArtist(id: string): void {
    const artistIndex = this.db.artists.findIndex(a => a.id === id);

    if (artistIndex === -1) {
      throw new NotFoundException(`Artist with id ${id} not found`);
    }
    this.db.artists.splice(artistIndex, 1);
  }

  getArtistById(id: string): IArtist {
    const artist = this.db.artists.find(a => a.id === id);
    if (!artist) {
      throw new NotFoundException(`Artist with id ${id} not found`);
    }
    return artist;
  }

  addAlbum(album: IAlbum) {
    this.db.albums.push(album);
  }

  getAllAlbums() {
    return this.db.albums;
  }

  getAlbumById(id: string) {
    const album = this.db.albums.find(a => a.id === id);
    if (!album) {
      throw new NotFoundException(`Album with id ${id} not found`);
    }
    return album;
  }

  updateAlbum(id: string, updateAlbumDto: Partial<IAlbum>): IAlbum {
    const index = this.db.albums.findIndex(a => a.id === id);
    const album = this.db.albums.find(a => a.id === id);

    if (index === -1) {
      throw new NotFoundException(`Album with id ${id} not found`);
    }

    this.db.albums.splice(index, 1, {...album, ...updateAlbumDto})
    return this.db.albums[index];
  }

  deleteAlbum(id: string) {
    const index = this.db.albums.findIndex(a => a.id === id);
    if (index === -1) {
      throw new NotFoundException(`Album with id ${id} not found`);
    }
    this.db.albums.splice(index, 1);
  }

  getAllFavorites() {
    return this.db.favorites;
  }

  addTrackToFavorites(id: string) {
    const track = this.db.tracks.find(t => t.id === id);
    // console.log(this.db.tracks, track);
    if (!track) {
      throw new NotFoundException(`Track with id ${id} not found`);
    }
    return track;
  }

  addArtistToFavorites(id: string) {
    const artist = this.db.artists.find(t => t.id === id);
    // console.log(this.db.tracks, track);
    if (!artist) {
      throw new NotFoundException(`Track with id ${id} not found`);
    }
    return artist;
  }

  addAlbumToFavorites(id: string) {
    const album = this.db.albums.find(a => a.id === id);
    if (!album) {
      throw new NotFoundException(`Album with id ${id} not found`);
    }

    return album;
  }

  addToFavorites(entity: 'artists' | 'albums' | 'tracks', item: IArtist | IAlbum | ITrack): void {
    if (!this.db.favorites[entity]) {
      throw new NotFoundException(`Entity ${entity} not found in favorites`);
    }

    const isExistInFavorites = this.db.favorites[entity].some((entity) => entity === item.id);

    if (!isExistInFavorites) {
      this.db.favorites[entity].push(item.id);
    }
  }

  deleteFromFavorites(entity: 'artists' | 'albums' | 'tracks', itemId: string): void {
    if (!this.db.favorites[entity]) {
      throw new NotFoundException(`Entity ${entity} not found in favorites`);
    }

    const index = this.db.favorites[entity].findIndex((item) => item === itemId);

    if (index !== -1) {
      this.db.favorites[entity].splice(index, 1);
    }
  }
}
