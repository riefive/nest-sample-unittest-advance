import { createMock, DeepMocked } from '@golevelup/ts-jest';
import { Test, TestingModule } from '@nestjs/testing';
import {
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { PokemonService } from './pokemon.service';

describe('PokemonService', () => {
  let service: PokemonService;
  let httpService: DeepMocked<HttpService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PokemonService,
        {
          provide: HttpService,
          useValue: createMock<HttpService>(),
        },
      ],
    }).compile();

    service = module.get<PokemonService>(PokemonService);
    httpService = module.get(HttpService);
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
      httpService.axiosRef.mockResolvedValueOnce({
        data: {
          species: { name: `bulbasaur` },
        },
        headers: {},
        config: { url: '' },
        status: 200,
        statusText: '',
      });
      const getPokemon = service.getPokemon(1);
      await expect(getPokemon).resolves.toBe('bulbasaur');
    });

    it('if Pokemon API response unexpectedly changes, throw an error', async () => {
      httpService.axiosRef.mockResolvedValueOnce({
        data: `Unexpected data`,
        headers: {},
        config: { url: '' },
        status: 200,
        statusText: '',
      });
      const getPokemon = service.getPokemon(1);
      await expect(getPokemon).rejects.toBeInstanceOf(
        InternalServerErrorException,
      );
    });
  });
});
