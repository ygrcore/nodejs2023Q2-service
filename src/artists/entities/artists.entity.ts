import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Artist {
  @PrimaryGeneratedColumn('uuid', { name: 'artistId' })
  id: string;

  @Column()
  name: string;

  @Column({ default: false })
  grammy: boolean;
}
