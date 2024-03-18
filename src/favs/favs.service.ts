import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Album } from 'src/album/entities/album.entity';
import { Artist } from 'src/artists/entities/artists.entity';
import { DbService } from '../db/db.service';
import { Track } from 'src/tracks/entities/tracks.entity';

@Injectable()
export class FavsService {
  constructor(private db: DbService) {}

  findAll() {
    const favorites: {
      artists: Artist[];
      albums: Album[];
      tracks: Track[];
    } = {
      artists: [],
      albums: [],
      tracks: [],
    };

    for (const key in this.db.favs) {
      for (let i = 0; i < this.db[key].length; i++) {
        for (let j = 0; j < this.db.favs[key].length; j++) {
          if (this.db[key][i].id === this.db.favs[key][j])
            favorites[key].push(this.db[key][i]);
        }
      }
    }

    return favorites;
  }

  addToFav(type: string, id: string) {
    const favItem = type + 's';

    const favItemId = this.db[favItem].find(
      (item: { id: string }) => item.id === id,
    );

    if (favItemId === undefined)
      throw new UnprocessableEntityException(`${type} with ${id} not found in favorites`);

    this.db.favs[favItem].push(favItemId.id);

    return this.db.favs[favItem];
  }

  removeItemFromFav(type: string, id: string) {
    const favItem = type + 's';

    const favIndex = this.db.favs[favItem].findIndex(
      (itemId: string) => itemId === id,
    );

    if (favIndex === -1) {
      throw new NotFoundException(
        `${type} with ${id} not found in favorites`,
      );
    } else {
      this.db.favs[favItem].splice(favIndex, 1);
      return;
    }
  }
}
