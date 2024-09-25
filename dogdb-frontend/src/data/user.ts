import { EXPRESS_URL } from "@/lib/constants";
import { getTokens } from "@/lib/cookie";

export const getUserById = async (id: string) => {
  const response = await fetch(
    `http://localhost:5000/api/v1/user/get-user-by-id/${id}`,
    {
      cache: "no-cache",
      method: "GET",
      credentials: "include",
    },
  );

  if (!response.ok) {
    return null;
  }

  const data = await response.json();

  return data.user;
};

export const getUserByEmail = async (email: string) => {
  const response = await fetch(
    `${EXPRESS_URL}/api/v1/user/get-user-by-email?email=${email}`,
    {
      method: "GET",
      cache: "no-cache",
    },
  );

  if (!response.ok) {
    return null;
  }

  const data = await response.json();

  return data.user;
};

export const getBreedOwners = async (breedId: string, email: string) => {
  try {
    const response = await fetch(
      `${EXPRESS_URL}/api/v1/user/breed-owner/${breedId}?email=${email}`,
      {
        method: "GET",
        cache: "no-cache",
      },
    );

    if (!response.ok) {
      return null;
    }
    const data = await response.json();

    return data.owners;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const refreshAccessToken = async () => {
  const { refreshToken } = getTokens();

  return fetch(`${EXPRESS_URL}/api/v1/user/refresh-token`, {
    method: "GET",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${refreshToken}`,
    },
  });
};

export async function loggedInUser() {
  const { accessToken } = getTokens();

  const response = await fetch(`${EXPRESS_URL}/api/v1/user/get-user`, {
    method: "GET",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    return null;
  }

  const data = await response.json();
  return data.user;
}

export async function logout() {
  const response = await fetch(`${EXPRESS_URL}/api/v1/user/logout`, {
    method: "POST",
    credentials: "include", // Ensure cookies are included in the request
  });

  if (response.ok) {
    // Redirect to login page or homepage after successful logout
    window.location.href = "/";
  } else {
    console.error("Logout failed");
  }
}

export async function isUserFollowing(userId: string) {
  try {
    const { accessToken } = getTokens();
    const response = await fetch(
      `${EXPRESS_URL}/api/v1/user/follow-status/${userId}`,
      {
        method: "GET",
        cache: "no-cache",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    return data.isFollowing;
  } catch (error) {
    console.error(error);
  }
}

export async function isUserBlocked(userId: string) {
  const { accessToken } = getTokens();

  const response = await fetch(
    `${EXPRESS_URL}/api/v1/user/block-status/${userId}`,
    {
      method: "GET",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  if (!response.ok) {
    return null;
  }

  const data = await response.json();
  return data.isBlocked;
}
