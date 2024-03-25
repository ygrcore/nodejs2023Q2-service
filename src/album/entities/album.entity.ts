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

  @ManyToOne(() => Artist, {
    eager: true,
    onDelete: 'SET NULL',
    nullable: true,
    orphanedRowAction: 'nullify',
  })
  @JoinColumn({ name: 'artistId' })
  artistId: Artist | null;
}
