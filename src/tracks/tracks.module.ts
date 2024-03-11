import { Module } from '@nestjs/common';
import { TracksService } from './tracks.service';
import { TracksController } from './tracks.controller';
import { DbService } from 'src/db/db.service';

@Module({
  providers: [TracksService, DbService],
  controllers: [TracksController]
})
export class TracksModule {}
