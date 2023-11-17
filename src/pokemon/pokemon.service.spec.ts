import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { PokemonService } from './pokemon.service';

describe('PokemonService', () => {
  let service: PokemonService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [PokemonService],
    }).compile();

    service = module.get<PokemonService>(PokemonService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getPokemon', () => {
    it('pokemon ID less than 1 should throw error', async () => {
      const getPokemon = service.getPokemon(0);
      await expect(getPokemon).rejects.toBeInstanceOf(BadRequestException);
    });

    it('pokemon ID greater than 151 should throw error', async () => {
      const getPokemon = service.getPokemon(152);
      await expect(getPokemon).rejects.toBeInstanceOf(BadRequestException);
    });

    it('valid pokemon ID to return the pokemon name', async () => {
      const getPokemon = service.getPokemon(1);
      await expect(getPokemon).resolves.toBe('bulbasaur');
    });
  });
});
