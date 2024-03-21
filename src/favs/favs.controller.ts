import {
  Controller,
  Get,
  Post,
  Delete,
  HttpCode,
  Param,
  ParseUUIDPipe,
} from '@nestjs/common';
import { FavsService } from './favs.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('favs')
@Controller('favs')
export class FavsController {
  constructor(private readonly favsService: FavsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all favorites' })
  @ApiResponse({ status: 200, description: 'All favorites' })
  findAll() {
    return this.favsService.findAll();
  }

  @Post(':type/:id')
  @ApiOperation({
    summary: 'Add to favorites',
    description: `type: album || track || artist`,
  })
  @ApiResponse({
    status: 201,
    description: 'Added to favorites',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid id (not uuid)',
  })
  @ApiResponse({
    status: 422,
    description: 'Item with id doesn`t exist',
  })
  @HttpCode(201)
  addToFavorites(
    @Param('type') type: 'album' | 'track' | 'artist',
    @Param('id', new ParseUUIDPipe()) id: string,
  ) {
    return this.favsService.addToFav(type, id);
  }

  @Delete(':type/:id')
  @HttpCode(204)
  @ApiOperation({
    summary: 'Delete from favorites',
    description: `type: album || track || artist`,
  })
  @ApiResponse({
    status: 204,
    description:
      'Deleted from favorites',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid id (not uuid)',
  })
  @ApiResponse({
    status: 404,
    description: 'Id not found',
  })
  removeItemFromFav(
    @Param('type') type: 'album' | 'track' | 'artist',
    @Param('id', new ParseUUIDPipe()) id: string,
  ) {
    return this.favsService.removeItemFromFav(type, id);
  }
}
