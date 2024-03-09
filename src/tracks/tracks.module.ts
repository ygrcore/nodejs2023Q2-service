import { Module } from '@nestjs/common';
import { TracksService } from './tracks.service';
import { TracksController } from './tracks.controller';

@Module({
  providers: [TracksService],
  controllers: [TracksController]
})
export class TracksModule {}
