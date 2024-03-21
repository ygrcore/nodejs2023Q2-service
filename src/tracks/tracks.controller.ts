import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  HttpCode,
  UsePipes,
  ValidationPipe,
  ParseUUIDPipe,
} from '@nestjs/common';
import { TracksService } from './tracks.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './entities/tracks.entity';

@ApiTags('track')
@Controller('track')
export class TracksController {
  constructor(private readonly tracksService: TracksService) {}

  @Post()
  @ApiOperation({ summary: 'Create new track' })
  @ApiResponse({
    status: 201,
    description: 'Created new track',
    type: Track
  })
  @ApiResponse({
    status: 400,
    description: 'Required fields are missed',
  })
  @UsePipes(new ValidationPipe())
  @HttpCode(201)
  create(@Body() createTrackDto: CreateTrackDto) {
    return this.tracksService.create(createTrackDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all tracks' })
  @ApiResponse({ status: 200, description: 'All tracks', type: [Track] })
  findAll() {
    return this.tracksService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get track by ID' })
  @ApiResponse({
    status: 200,
    description: 'Found track',
  })
  @ApiResponse({
    status: 400,
    description: 'TrackId is invalid (not uuid)',
  })
  @ApiResponse({
    status: 404,
    description: 'Not Found',
  })
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.tracksService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update track' })
  @ApiResponse({
    status: 200,
    description: 'Updated track',
  })
  @ApiResponse({
    status: 400,
    description: 'TrackId is invalid (not uuid)',
  })
  @ApiResponse({
    status: 404,
    description: 'Not Found',
  })
  @UsePipes(new ValidationPipe())
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateTrackDto: UpdateTrackDto,
  ) {
    return this.tracksService.update(id, updateTrackDto);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Delete track' })
  @ApiResponse({
    status: 204,
    description: 'Deleted',
  })
  @ApiResponse({
    status: 400,
    description: 'TrackId is invalid (not uuid)',
  })
  @ApiResponse({
    status: 404,
    description: 'Not found',
  })
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.tracksService.remove(id);
  }
}
