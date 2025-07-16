"use client";

import type React from "react";
import { use, useState, type ChangeEvent } from "react";
import { v4 as uuidv4 } from "uuid";
import { MessageSquare, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MessageData } from "@/lib/types";
import { postChatMessage } from "@/app/api/aiChatApi";
import AuthContext from "@/context/AuthContext";

export default function ChatbotButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<MessageData[]>([]);
  const [text, setText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const { token } = use(AuthContext);
 
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setText(value);
  };

  const handleSendMessage = async () => {
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
    const newMessage = chatResponse.messages[0].content;
    const assistantMessage: MessageData = {
      role: "assistant",
      content: newMessage,
      id: uuidv4(),
    };
    setMessages((prev) => [...prev, assistantMessage]);
    setIsLoading(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {isOpen && (
        <div className="bg-white rounded-lg shadow-lg w-80 mb-4 overflow-hidden">
          <div className="bg-black text-white p-4 flex justify-between items-center">
            <h3 className="font-medium">Chat with AI</h3>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="h-6 w-6 text-white hover:text-white hover:bg-gray-800"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <div className="p-4 h-80 overflow-y-auto bg-gray-50">
            {messages.map((m) => {
              if (m.role === "assistant") {
                return (
                  <div key={m.id} className="bg-gray-200 p-3 rounded-lg mb-2 max-w-[80%]">
                    {m.content}
                  </div>
                );
              }
              return (
                <div key={m.id} className="flex justify-end">
                  <div className="bg-black text-white p-3 rounded-lg mb-2 max-w-[80%]">{m.content}</div>
                </div>
              );
            })}
            {isLoading && (
              <div className="bg-gray-200 p-3 rounded-lg mb-2 max-w-[80%]">
                Loading...
              </div>
            )}
          </div>
          <div className="p-4 border-t">
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
        </div>
      )}

      <Button onClick={() => setIsOpen(!isOpen)} className="h-14 w-14 rounded-full shadow-lg">
        <MessageSquare className="h-6 w-6" />
        <span className="sr-only">Chat with AI</span>
      </Button>
    </div>
  );
}

// Import the Input component for the chat input
const Input = ({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <input
      className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      {...props}
    />
  );
};
