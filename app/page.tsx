"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"

interface Message {
  id: string
  type: "user" | "system" | "umbra"
  content: string
  timestamp: Date
}

export default function UmbraTerminal() {
  const [showTerminal, setShowTerminal] = useState(false)
  const [loadingProgress, setLoadingProgress] = useState(0)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const loadingInterval = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(loadingInterval)
          return 100
        }
        return prev + 2.22 // Increment to reach 100% in ~4.5 seconds
      })
    }, 100)

    // Play video for 5 seconds then show terminal
    const timer = setTimeout(() => {
      setShowTerminal(true)
      // Add initial system messages
      setMessages([
        {
          id: "1",
          type: "system",
          content: "UMBRA OS v2.1.0 - Initializing...",
          timestamp: new Date(),
        },
        {
          id: "2",
          type: "system",
          content: "Neural pathways established. Language model online.",
          timestamp: new Date(),
        },
        {
          id: "3",
          type: "umbra",
          content: "Welcome to UMBRA. I am your AI companion. How may I assist you today?",
          timestamp: new Date(),
        },
      ])
    }, 5000)

    return () => {
      clearTimeout(timer)
      clearInterval(loadingInterval)
    }
  }, [])

  useEffect(() => {
    if (showTerminal && inputRef.current) {
      inputRef.current.focus()
    }
  }, [showTerminal])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: input,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "Processing your request through neural networks...",
        "I understand. Let me analyze that for you.",
        "Interesting query. My language model is processing...",
        "Accessing knowledge base. Please standby.",
        "Your request has been processed. Here's my analysis...",
      ]

      const umbraResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: "umbra",
        content: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, umbraResponse])
      setIsTyping(false)
    }, 2000)
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    })
  }

  const copyContract = () => {
    // Placeholder contract address - will be updated when announced
    const contractText = "918iW3U2qBwvUx4B8x4uDfUSxqboX7e85gUPWZq3pump";
    navigator.clipboard
      .writeText(contractText)
      .then(() => {
        console.log("[v0] Contract text copied to clipboard")
      })
      .catch(() => {
        console.log("[v0] Failed to copy contract text")
      })
  }

  return (
    <div className="h-screen w-screen relative bg-black overflow-hidden">
      <nav className="absolute top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-sm border-b border-purple-500/30">
        <div className="flex items-center justify-center h-16 px-4">
          <Button
            onClick={copyContract}
            className="bg-purple-600/80 hover:bg-purple-700/80 text-white font-mono
                     border border-purple-500/50 neon-purple text-sm px-6 py-2
                     transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20"
          >
            Contract: To Be Announced
          </Button>
        </div>
      </nav>

      {/* Background Video */}
      <video
        ref={videoRef}
        autoPlay
        muted
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
          showTerminal ? "opacity-20" : "opacity-100"
        }`}
      >
        <source src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/infera-1Mb0rTazSFHnB3jNpqRYwd9GXXYrnw.mp4" type="video/mp4" />
      </video>

      {!showTerminal && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-96 max-w-md mx-4">
            <div className="text-center mb-6">
              <h2 className="neon-text text-6xl font-mono font-bold mb-2">UMBRA</h2>
              <p className="text-purple-300 text-sm font-mono">Initializing Neural Interface...</p>
            </div>

            <div className="relative">
              <div className="w-full h-2 bg-black/50 border border-purple-500/50 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-purple-600 to-cyan-400 neon-purple transition-all duration-100 ease-out"
                  style={{ width: `${loadingProgress}%` }}
                />
              </div>
              <div className="text-center mt-3">
                <span className="text-purple-400 font-mono text-sm">{Math.round(loadingProgress)}% Complete</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Terminal Interface */}
      {showTerminal && (
        <div className="absolute inset-0 flex items-center justify-center p-4 pt-20">
          <div
            className={`
            w-full max-w-7xl h-5/6 bg-black/90 backdrop-blur-sm 
            neon-purple terminal-expand terminal-glow rounded-lg
            grid grid-cols-12 gap-4 p-6 relative scanlines
          `}
          >
            {/* Left Column - System Info */}
            <div className="col-span-2 border-r border-purple-500/30 pr-4">
              <div className="neon-text text-sm font-mono mb-4">
                <div className="mb-2">UMBRA OS</div>
                <div className="text-xs text-purple-300">v2.1.0</div>
              </div>

              <div className="space-y-2 text-xs text-purple-400">
                <div>CPU: Neural Core</div>
                <div>RAM: ∞ TB</div>
                <div>NET: Quantum Link</div>
                <div className="text-green-400">STATUS: ONLINE</div>
              </div>

              <div className="mt-8 text-xs text-purple-300">
                <div className="mb-2">ACTIVE MODULES:</div>
                <div className="space-y-1 text-purple-400">
                  <div>• Language Model</div>
                  <div>• Neural Interface</div>
                  <div>• Quantum Processor</div>
                </div>
              </div>
            </div>

            {/* Center Column - Main Terminal */}
            <div className="col-span-8 flex flex-col">
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-purple-500/30">
                <h1 className="neon-text text-2xl font-mono font-bold">UMBRA TERMINAL</h1>
                <div className="text-purple-400 text-sm font-mono">{new Date().toLocaleDateString()}</div>
              </div>

              <ScrollArea className="flex-1 mb-4">
                <div className="space-y-3 font-mono text-sm">
                  {messages.map((message) => (
                    <div key={message.id} className="flex gap-3">
                      <span className="text-purple-400 text-xs min-w-[60px]">{formatTime(message.timestamp)}</span>
                      <span
                        className={`
                        ${
                          message.type === "user"
                            ? "text-cyan-400"
                            : message.type === "system"
                              ? "text-green-400"
                              : "text-purple-300"
                        }
                      `}
                      >
                        {message.type === "user" ? ">" : message.type === "system" ? "[SYS]" : "[UMBRA]"}
                      </span>
                      <span
                        className={`
                        ${
                          message.type === "user"
                            ? "text-white"
                            : message.type === "system"
                              ? "text-green-300"
                              : "text-purple-100"
                        }
                      `}
                      >
                        {message.content}
                      </span>
                    </div>
                  ))}

                  {isTyping && (
                    <div className="flex gap-3">
                      <span className="text-purple-400 text-xs min-w-[60px]">{formatTime(new Date())}</span>
                      <span className="text-purple-300">[UMBRA]</span>
                      <span className="text-purple-100 typing-cursor">Thinking</span>
                    </div>
                  )}
                </div>
              </ScrollArea>

              <form onSubmit={handleSubmit} className="flex gap-2">
                <div className="flex-1 relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-cyan-400 font-mono">
                    {">"}
                  </span>
                  <Input
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Enter command or query..."
                    className="pl-8 bg-black/50 border-purple-500/50 text-white font-mono 
                             focus:border-purple-400 focus:ring-purple-400/20"
                    disabled={isTyping}
                  />
                </div>
                <Button
                  type="submit"
                  disabled={isTyping}
                  className="bg-purple-600 hover:bg-purple-700 text-white font-mono
                           border border-purple-500 neon-purple"
                >
                  EXECUTE
                </Button>
              </form>
            </div>

            {/* Right Column - Logs & Stats */}
            <div className="col-span-2 border-l border-purple-500/30 pl-4">
              <div className="neon-text text-sm font-mono mb-4">SYSTEM LOGS</div>

              <ScrollArea className="h-64">
                <div className="space-y-1 text-xs text-purple-400">
                  <div>[{formatTime(new Date())}] Neural link established</div>
                  <div>[{formatTime(new Date())}] Language model loaded</div>
                  <div>[{formatTime(new Date())}] Interface initialized</div>
                  <div>[{formatTime(new Date())}] Ready for input</div>
                </div>
              </ScrollArea>

              <div className="mt-8 text-xs text-purple-300">
                <div className="mb-2">PERFORMANCE:</div>
                <div className="space-y-1 text-purple-400">
                  <div>Response Time: 0.02ms</div>
                  <div>Accuracy: 99.7%</div>
                  <div>Uptime: 100%</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
