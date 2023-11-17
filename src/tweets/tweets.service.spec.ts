import { Test, TestingModule } from '@nestjs/testing';
import { TweetsService } from './tweets.service';

describe('TweetsService', () => {
  let service: TweetsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TweetsService],
    }).compile();

    service = module.get<TweetsService>(TweetsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getTweets', () => {
    it('should return back all tweets', () => {
      service.tweets = ['hello world', 'this is a tweet', 'another tweet'];
      const tweets = service.getTweets();
      tweets.forEach((tweet) => expect(typeof tweet).toBe('string'));
      expect(tweets).toHaveLength(3);
    });
  });

  describe('createTweet', () => {
    it('should create tweet', () => {
      // Arrange
      service.tweets = [];
      const payload = 'This is my tweet';
      // Act
      const tweet = service.createTweet(payload);
      // Assert
      expect(tweet).toBe(payload);
      expect(service.tweets).toHaveLength(1);
    });

    it('should prevent tweets created which are over 100 characters', () => {
      // Arrange
      const payload =
        'This is a long tweet over 100 characters This is a long tweet over 100 characters This is a long t...';
      // Act
      const tweet = () => {
        return service.createTweet(payload);
      };
      // Assert
      expect(tweet).toThrow();
    });
  });

  describe('updateTweet', () => {
    it('should update and return tweet', () => {
      service.tweets = ['hello world'];
      const id = 0;
      const tweet = service.updateTweet('goodbye world', id);
      expect(tweet).toBe('goodbye world');
      expect(service.tweets[id]).toBe('goodbye world');
    });

    it('show throw an error for tweets that exceed 100 characters', () => {
      service.tweets = ['hello world'];
      const payload =
        'tweet that is over 100 characters in length tweet that is over 100 characters in length tweet that is over 100 characters in length tweet that is over 100 characters in length ';
      const tweet = () => service.updateTweet(payload, 0);
      expect(tweet).toThrow();
    });

    it('show throw an error if the tweet does not exist', () => {
      service.tweets = ['hello world'];
      const tweet = () => service.updateTweet('goodbye world', 1);
      expect(tweet).toThrow();
    });
  });

  describe('deleteTweet', () => {
    it('should delete and return tweet', () => {
      service.tweets = ['hello world'];
      const id = 0;
      const tweet = service.deleteTweet(id);
      expect(tweet).toBe('hello world');
      expect(service.tweets[id]).toBe(undefined);
      expect(service.tweets).toHaveLength(0);
    });

    it('show throw an error if the tweet does not exist', () => {
      service.tweets = ['hello world'];
      const tweet = () => service.deleteTweet(1);
      expect(tweet).toThrow();
    });
  });
});
