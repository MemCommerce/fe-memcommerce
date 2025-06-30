import { ChatResponse, MessageData } from "@/lib/types";
import { AI_CHAT_URL } from "@/lib/urls";

export const postChatMessage = async (message: MessageData, conversationId: string | null): Promise<ChatResponse> => {
  const postBody = {
    message: message.content,
    conversation_id: conversationId
  };
  const resp = await fetch(AI_CHAT_URL, {
    method: "POST",
    body: JSON.stringify(postBody),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data: ChatResponse = await resp.json();
  return data;
};