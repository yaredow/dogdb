import { EXPRESS_URL } from "@/lib/constants";

export const startConversation = async (userId: string) => {
  const response = await fetch(`${EXPRESS_URL}/api/v1/conversation`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId }),
  });

  if (!response.ok) {
    throw new Error("Failed to start conversation");
  }

  const data = await response.json();
  console.log({ data });

  return data.conversation;
};

export const deleteConversation = async (conversationId: string) => {
  const response = await fetch(
    `${EXPRESS_URL}/api/v1/conversation/delete-conversation/${conversationId}`,
    {
      method: "DELETE",
      credentials: "include",
    },
  );

  if (!response.ok) {
    throw new Error("Something happened while deleting the conversation");
  }

  const data = await response.json();
  return data.message;
};
