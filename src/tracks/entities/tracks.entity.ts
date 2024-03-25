import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Album } from 'src/album/entities/album.entity';
import { Artist } from 'src/artists/entities/artists.entity';

@Entity()
export class Track {
  @PrimaryGeneratedColumn('uuid', { name: 'trackId' })
  id: string; // uuid v4

  @Column()
  name: string;

  @ManyToOne(() => Artist, {
    eager: true,
    onDelete: 'SET NULL',
    nullable: true,
    orphanedRowAction: 'nullify',
  })
  @JoinColumn({ name: 'artistId', referencedColumnName: 'id' })
  artistId: Artist;

  @ManyToOne(() => Album, {
    eager: true,
    onDelete: 'SET NULL',
    nullable: true,
    orphanedRowAction: 'nullify',
  })
  @JoinColumn({ name: 'albumId', referencedColumnName: 'id' })
  albumId: Album;

  @Column('int')
  duration: number;
}