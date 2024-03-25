import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Artist } from 'src/artists/entities/artists.entity';
import { Album } from 'src/album/entities/album.entity';
import { Track } from 'src/tracks/entities/tracks.entity';

@Entity()
export class Fav {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Artist, { eager: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'artistId' })
  artist: Artist | null;

  @ManyToOne(() => Album, { eager: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'albumId' })
  album: Album | null;

  @ManyToOne(() => Track, { eager: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'trackId' })
  track: Track | null;
}

// export class Fav {
//   artists: string[];
//   albums: string[];
//   tracks: string[];
// }
