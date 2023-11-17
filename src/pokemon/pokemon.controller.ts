import {
  BadRequestException,
  Controller,
  Get,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { PokemonService } from './pokemon.service';

@Controller('pokemon')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  @Get(':id')
  getPokemon(@Param('id', ParseIntPipe) id: number) {
    if (id < 0 || id > 151) {
      throw new BadRequestException(`Invalid Pokemon ID`);
    }
    return this.pokemonService.getPokemon(id);
  }
}
