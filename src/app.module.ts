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
import { TypeOrmModule } from '@nestjs/typeorm';
// import { User } from './users/entities/user.entity';
// import { Track } from './tracks/entities/tracks.entity';
// import { Artist } from './artists/entities/artists.entity';
// import { Album } from './album/entities/album.entity';
// import { Fav } from './favs/entities/fav.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env'
    }),
    UsersModule,
    TracksModule,
    ArtistsModule,
    AlbumModule,
    FavsModule,
    DbModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      // entities: [User, Track, Artist, Album, Fav],
      entities: [__dirname + '/**/*.entity{.js, .ts}'],
      synchronize: true,
      autoLoadEntities: true,
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
