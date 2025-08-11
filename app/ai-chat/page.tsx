"use client";

import { use, useState, type ChangeEvent } from "react";
import { v4 as uuidv4 } from "uuid";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageData } from "@/lib/types";
import { postChatMessage } from "@/app/api/aiChatApi";
import AuthContext from "@/context/AuthContext";

export default function AIChatPage() {
  const [messages, setMessages] = useState<MessageData[]>([]);
  const [text, setText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const { token } = use(AuthContext);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleSendMessage = async () => {
    if (!text.trim()) return;
    const userMessage: MessageData = {
      role: "user",
      content: text,
      id: uuidv4(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);
    setText("");
    const chatResponse = await postChatMessage(userMessage, conversationId, token);
    if (!conversationId) {
      setConversationId(chatResponse.conversation_id);
    }
    const assistantMessage: MessageData = {
      role: "assistant",
      content: chatResponse.messages[0].content,
      id: uuidv4(),
    };
    setMessages((prev) => [...prev, assistantMessage]);
    setIsLoading(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">AI Chat</h1>
      <div className="border rounded-lg p-4 h-[60vh] overflow-y-auto bg-gray-50 mb-4">
        {messages.map((m) =>
          m.role === "assistant" ? (
            <div key={m.id} className="bg-gray-200 p-3 rounded-lg mb-2 max-w-[80%]">
              {m.content}
            </div>
          ) : (
            <div key={m.id} className="flex justify-end">
              <div className="bg-black text-white p-3 rounded-lg mb-2 max-w-[80%]">{m.content}</div>
            </div>
          )
        )}
        {isLoading && (
          <div className="bg-gray-200 p-3 rounded-lg mb-2 max-w-[80%]">
            Loading...
          </div>
        )}
      </div>
      <div className="flex">
        <Input
          placeholder="Type your message..."
          className="flex-grow"
          value={text}
          onChange={handleInputChange}
        />
        <Button className="ml-2" onClick={handleSendMessage} disabled={isLoading}>
          Send
        </Button>
      </div>
    </div>
  );
}
