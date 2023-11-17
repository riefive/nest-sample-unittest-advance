import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { PokemonService } from './pokemon.service';

@Module({
  imports: [HttpModule],
  providers: [PokemonService],
})
export class PokemonModule {}
