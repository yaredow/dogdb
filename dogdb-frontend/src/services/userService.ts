import { EXPRESS_URL } from "@/lib/constants";

export const followUser = async (followingId: string) => {
  const response = await fetch(
    `${EXPRESS_URL}/api/v1/user/follow/${followingId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    },
  );

  if (!response.ok) {
    throw new Error("Error while trying to follow user");
  }

  const data = await response.json();
  return data;
};

export const unfollowUser = async (followingId: string) => {
  const response = await fetch(
    `${EXPRESS_URL}/api/v1/user/unfollow/${followingId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    },
  );

  if (!response.ok) {
    throw new Error("Something happened");
  }

  const data = await response.json();
  return data;
};

export const blockUser = async (blockedId: string) => {
  console.log(`Blocking user ${blockedId}`);
  const response = await fetch(
    `${EXPRESS_URL}/api/v1/user/block/${blockedId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    },
  );

  if (!response.ok) {
    throw new Error("Something happened");
  }

  const data = await response.json();
  return data;
};

export const unblockUser = async (blockedId: string) => {
  const response = await fetch(
    `${EXPRESS_URL}/api/v1/user/unblock/${blockedId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    },
  );

  if (!response.ok) {
    throw new Error("Something happened");
  }

  const data = await response.json();
  return data;
};

export const blockStatus = async (userId: string) => {
  const response = await fetch(
    `${EXPRESS_URL}/api/v1/user/block-status/${userId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    },
  );

  if (!response.ok) {
    return null;
  }

  const data = await response.json();

  return data.isBlocked;
};

export const followStatus = async (userId: string) => {
  const response = await fetch(
    `${EXPRESS_URL}/api/v1/user/follow-status/${userId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    },
  );

  if (!response.ok) {
    return null;
  }

  const data = await response.json();
  return data.isFollowing;
};

export const getCurrentLoggedInUser = async () => {
  const response = await fetch(`${EXPRESS_URL}/api/v1/user/get-user`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Something happened");
  }

  const data = await response.json();
  return data.user;
};
