import { Injectable } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';
import { Track } from 'src/tracks/entities/tracks.entity';
import { Album } from 'src/album/entities/album.entity';
import { Artist } from 'src/artists/entities/artists.entity';
import { Fav } from 'src/favs/entities/fav.entity';

@Injectable()
export class DbService {
  users: User[] = [
      {
        id: 'c973c927-1d2a-47bd-a65c-02d62d06594c',
        version: 1,
        createdAt: 1710149665242,
        updatedAt: 1710149665242,
        login: 'string',
        password: 'string'
      }
  ];
  artists: Artist[] = [
      {
        id: '3e49a59f-e6f4-49e7-a17b-02d62d06594c',
        name: 'Tester',
        grammy: false,
      }
  ];
  tracks: Track[] = [
      {
        id: '3e49a59f-e6f4-49e7-a17b-70546c28e873',
        name: 'Test',
        artistId: '3e49a59f-e6f4-49e7-a17b-02d62d06594c',
        albumId: null,
        duration: 2,
      }
  ];
  albums: Album[] = [];
  favs: Fav = {
    artists: [],
    albums: [],
    tracks: [],
  };
}
