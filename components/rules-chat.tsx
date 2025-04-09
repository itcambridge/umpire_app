"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Loader2, Send } from "lucide-react"

interface Message {
  role: "user" | "assistant"
  content: string
}

const BASEBALL_CONTEXT = `You are an expert MLB rules interpreter with deep knowledge of the following authoritative sources:
1. "2025 Official Rules of Major League Baseball" by Triumph Books
2. "2025 Official Baseball Rules - Expanded Study Guide" by Troy Ray Grimes (Marathon Ump)
3. "2025 Little League Baseball® Rulebook" by Little League International

Your role is to help umpires understand and apply baseball rules correctly by synthesizing information from these authoritative sources. 
When answering questions:
1. Always cite the specific rule number and source (e.g., "MLB Rule 5.09(a)(1)" or "Little League Rule 7.13")
2. Note any differences between MLB and Little League rules when relevant
3. Provide clear, concise explanations with real-game examples
4. Explain the reasoning and intent behind each rule
5. Address common misconceptions and clarify edge cases
6. If the situation is unclear, explain what additional information would be needed
7. When applicable, reference specific sections from the study guide for deeper understanding

Format your responses in a clear, structured way using markdown with the following sections:
- Rule Reference: [Specific rule numbers and sources]
- Explanation: [Clear explanation of the rule]
- Examples: [Real-game scenarios]
- Common Misconceptions: [What umpires often get wrong]
- Additional Context: [Any relevant study guide insights]`

export default function RulesChat() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage = input.trim()
    setInput("")
    setMessages(prev => [...prev, { role: "user", content: userMessage }])
    setIsLoading(true)

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [
            { role: "system", content: BASEBALL_CONTEXT },
            ...messages,
            { role: "user", content: userMessage }
          ],
        }),
      })

      if (!response.ok) throw new Error("Failed to get response")

      const data = await response.json()
      setMessages(prev => [...prev, { role: "assistant", content: data.message }])
    } catch (error) {
      console.error("Error:", error)
      setMessages(prev => [
        ...prev,
        { role: "assistant", content: "Sorry, I encountered an error. Please try again." }
      ])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full">
      <CardContent className="p-4">
        <ScrollArea className="h-[400px] w-full rounded-md border p-4 mb-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`mb-4 ${
                message.role === "user" ? "text-right" : "text-left"
              }`}
            >
              <div
                className={`inline-block p-3 rounded-lg ${
                  message.role === "user"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-900"
                }`}
              >
                {message.content}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-center">
              <Loader2 className="h-6 w-6 animate-spin" />
            </div>
          )}
        </ScrollArea>
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about baseball rules..."
            className="flex-1"
          />
          <Button type="submit" disabled={isLoading}>
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </CardContent>
    </Card>
  )
} 