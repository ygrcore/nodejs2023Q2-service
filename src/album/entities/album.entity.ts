import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { Artist } from 'src/artists/entities/artists.entity';

@Entity()
export class Album {
  @PrimaryGeneratedColumn('uuid', { name: 'albumId' })
  id: string;

  @Column()
  name: string;

  @Column()
  year: number;

  @ManyToOne(() => Artist, { nullable: true })
  @JoinColumn({ name: 'artistId' })
  artistId: Artist | null;
}
