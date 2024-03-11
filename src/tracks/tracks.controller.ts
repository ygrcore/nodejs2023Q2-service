import { Controller, Get, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { TracksService } from './tracks.service';
import { Track } from 'src/dto/music';

@Controller('track')
export class TracksController {
  constructor(private readonly tracksService: TracksService) {}

  @Get()
  getAllTracks() {
    return this.tracksService.getAllTracks();
  }

  @Get(':id')
  getTrackById(@Param('id') id: string) {
    return this.tracksService.getTrackById(id);
  }

  @Post()
  createTrack(@Body() track: Track) {
    return this.tracksService.createTrack(track);
  }

  @Put(':id')
  updateTrack(@Param('id') id: string, @Body() track: Track) {
    return this.tracksService.updateTrack(id, track);
  }

  @Delete(':id')
  deleteTrack(@Param('id') id: string) {
    this.tracksService.deleteTrack(id);
  }
}
