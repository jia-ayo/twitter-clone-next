//@ts-ignore
export const userTransformer = (user) => {
  return {
    id: user.id,
    name: user.name,
    username: user.username,
    profileImage: user.profileImage,
    bio: user.bio,
    coverImage: user.coverImage,
    followingIds: user.followingIds,
    hasNotification: user.hasNotification,
    followerscount: user.followerscount,
    createdAt: user.createdAt,
  };
};
