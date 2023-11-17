import { Injectable } from '@nestjs/common';

@Injectable()
export class TweetsService {
  tweets: string[] = [];

  getTweets() {
    return this.tweets;
  }

  createTweet(tweet: string) {
    if (tweet.length > 100) {
      throw new Error(`Tweet too long`);
    }
    this.tweets.push(tweet);
    return tweet;
  }

  updateTweet(tweet: string, id: number) {
    const tweetToUpdate = this.tweets[id];
    if (!tweetToUpdate) {
      throw new Error(`This Tweet does not exist`);
    }
    if (tweet.length > 100) {
      throw new Error(`Tweet too long`);
    }
    this.tweets[id] = tweet;
    return tweet;
  }

  deleteTweet(id: number) {
    const tweetToDelete = this.tweets[id];
    if (!tweetToDelete) {
      throw new Error(`This Tweet does not exist`);
    }
    this.tweets.splice(id, 1);
    return tweetToDelete;
  }
}
