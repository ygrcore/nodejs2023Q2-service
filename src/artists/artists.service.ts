import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entities/artists.entity';

@Injectable()
export class ArtistsService {
  constructor(@InjectRepository(Artist) private artistsRepository: Repository<Artist>) {}

  async create(createArtistDto: CreateArtistDto): Promise<Artist> {
    const { name, grammy } = createArtistDto;

    const newArtist = new Artist();
    newArtist.name = name;
    newArtist.grammy = grammy;

    await this.artistsRepository.save(newArtist);

    return newArtist;
  }

  async findAll(): Promise<Artist[]> {
    return await this.artistsRepository.find();
  }

  async findOne(id: string): Promise<Artist> {
    const artist = await this.artistsRepository.findOneBy({ id });

    if (!artist) throw new NotFoundException(`Artist with ${id} not found`);

    return artist;
  }

  async update(id: string, updateArtistDto: UpdateArtistDto): Promise<Artist> {
    let artist: Artist = await this.findOne(id)
    if (!artist) {
      throw new NotFoundException(`Artist with ${id} not found`);
    } else {
      artist = { ...updateArtistDto, id };
      await this.artistsRepository.save(artist);
      return artist;
    }
  }

  async remove(id: string): Promise<void> {
    const artist = await this.artistsRepository.findOneBy({ id });

    if (!artist) throw new NotFoundException(`Artist with ${id} not found`);

    await this.artistsRepository.remove(artist);
  }
}
