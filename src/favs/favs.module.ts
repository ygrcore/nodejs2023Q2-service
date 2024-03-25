import { Module } from '@nestjs/common';
import { FavsService } from './favs.service';
import { FavsController } from './favs.controller';
import { Artist } from 'src/artists/entities/artists.entity';
import { Album } from 'src/album/entities/album.entity';
import { Track } from 'src/tracks/entities/tracks.entity';
import { Fav } from './entities/fav.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Artist, Album, Track, Fav])],
  controllers: [FavsController],
  providers: [FavsService]
})
export class FavsModule {}
