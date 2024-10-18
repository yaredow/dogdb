import { EXPRESS_URL } from "@/lib/constants";
import { getTokens } from "@/lib/cookie";

export async function getConversationById(conversationId: string) {
  const { accessToken } = getTokens();

  try {
    const response = await fetch(
      `${EXPRESS_URL}/api/v1/conversation/get-conversation/${conversationId}`,
      {
        method: "GET",
        cache: "no-cache",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    if (!response.ok) return null;

    const data = await response.json();

    return data.conversation;
  } catch (error) {
    console.error(error);

    return null;
  }
}

export async function getConversations() {
  const { accessToken } = getTokens();

  try {
    const response = await fetch(
      `${EXPRESS_URL}/api/v1/conversation/get-conversations`,
      {
        method: "GET",
        cache: "no-cache",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`, // Fix typo here
        },
      },
    );

    if (!response.ok) return [];

    const data = await response.json();

    return data.conversations;
  } catch (error) {
    console.error(error);

    return [];
  }
}
