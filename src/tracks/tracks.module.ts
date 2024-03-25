import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TracksService } from './tracks.service';
import { TracksController } from './tracks.controller';
import { Track } from './entities/tracks.entity';
import { Artist } from 'src/artists/entities/artists.entity';
import { Album } from 'src/album/entities/album.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Track, Artist, Album])],
  providers: [TracksService],
  controllers: [TracksController]
})
export class TracksModule {}
