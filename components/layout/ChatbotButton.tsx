"use client"

import type React from "react"

import { useState } from "react"
import { MessageSquare, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ChatbotButton() {
  const [isOpen, setIsOpen] = useState(false)

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
            <div className="bg-gray-200 p-3 rounded-lg mb-2 max-w-[80%]">
              Hello! How can I help you with your shopping today?
            </div>
            <div className="flex justify-end">
              <div className="bg-black text-white p-3 rounded-lg mb-2 max-w-[80%]">I'm looking for summer clothes</div>
            </div>
            <div className="bg-gray-200 p-3 rounded-lg max-w-[80%]">
              Great! We have a fantastic collection of summer clothes. Would you like to see our t-shirts, shorts, or
              dresses?
            </div>
          </div>
          <div className="p-4 border-t">
            <div className="flex">
              <Input placeholder="Type your message..." className="flex-grow" />
              <Button className="ml-2">Send</Button>
            </div>
          </div>
        </div>
      )}

      <Button onClick={() => setIsOpen(!isOpen)} className="h-14 w-14 rounded-full shadow-lg">
        <MessageSquare className="h-6 w-6" />
        <span className="sr-only">Chat with AI</span>
      </Button>
    </div>
  )
}

// Import the Input component for the chat input
const Input = ({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <input
      className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      {...props}
    />
  )
}
