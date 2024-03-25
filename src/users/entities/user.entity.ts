import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Generated } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Generated('uuid')
  id: string; // uuid v4

  @Column()
  login: string;

  @Column()
  password: string;

  @Column('int')
  version: number; // integer number, increments on update

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date; // timestamp of creation

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date; // timestamp of last update
}