"use client";

import { use, useState, type ChangeEvent } from "react";
import { v4 as uuidv4 } from "uuid";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageData } from "@/lib/types";
import { postChatMessage } from "@/app/api/aiChatApi";
import AuthContext from "@/context/AuthContext";
import { Bot, Loader2, Send, User } from "lucide-react";

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
            <div key={m.id} className="flex items-start mb-2">
              <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center mr-2">
                <Bot className="w-4 h-4" />
              </div>
              <div className="bg-gray-200 p-3 rounded-lg max-w-[80%]">{m.content}</div>
            </div>
          ) : (
            <div key={m.id} className="flex items-start justify-end mb-2">
              <div className="bg-black text-white p-3 rounded-lg max-w-[80%]">{m.content}</div>
              <div className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center ml-2">
                <User className="w-4 h-4" />
              </div>
            </div>
          )
        )}
        {isLoading && (
          <div className="flex items-start mb-2">
            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center mr-2">
              <Loader2 className="w-4 h-4 animate-spin" />
            </div>
            <div className="bg-gray-200 p-3 rounded-lg w-fit max-w-[40%]">Loading...</div>
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
        <Button
          className="ml-2"
          onClick={handleSendMessage}
          disabled={isLoading}
          aria-label="Send message"
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
