import { userTransformer } from "./userTransformer";

export const tweetTransformer = (tweet: any) => {
  return {
    id: tweet.id,
    body: tweet.body,
    userId: tweet.userId,
    likedIds: tweet.likedIds,
    user: userTransformer(tweet.user),
    createdAt: tweet.createdAt,
    comments: tweet.comments,
  };
};
