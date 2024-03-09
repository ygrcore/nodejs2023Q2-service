import { Controller, Get, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { TracksService } from './tracks.service';
import { Track } from 'src/dto/music';

@Controller('tracks')
export class TracksController {
  constructor(private readonly trackService: TracksService) {}

  @Get()
  getAllTracks() {
    return this.trackService.getAllTracks();
  }

  @Get(':id')
  getTrackById(@Param('id') id: string) {
    return this.trackService.getTrackById(id);
  }

  @Post()
  createTrack(@Body() track: Track) {
    return this.trackService.createTrack(track);
  }

  @Put(':id')
  updateTrack(@Param('id') id: string, @Body() track: Track) {
    return this.trackService.updateTrack(id, track);
  }

  @Delete(':id')
  deleteTrack(@Param('id') id: string) {
    this.trackService.deleteTrack(id);
  }
}
