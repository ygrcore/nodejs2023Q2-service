import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TracksModule } from './tracks/tracks.module';
import { ArtistsModule } from './artists/artists.module';
import { AlbumModule } from './album/album.module';
import { FavsModule } from './favs/favs.module';
import { DbModule } from './db/db.module';

@Module({
  imports: [ConfigModule.forRoot(), UsersModule, TracksModule, ArtistsModule, AlbumModule, FavsModule, DbModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
