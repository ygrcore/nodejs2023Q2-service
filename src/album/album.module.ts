import { Module } from '@nestjs/common';
import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';
import { Album } from './entities/album.entity';
import { Artist } from 'src/artists/entities/artists.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Album, Artist])],
  controllers: [AlbumController],
  providers: [AlbumService]
})
export class AlbumModule {}
