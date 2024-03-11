import { Injectable } from '@nestjs/common';
import { IDatabase } from 'src/dto/dbase';

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
  }
}
