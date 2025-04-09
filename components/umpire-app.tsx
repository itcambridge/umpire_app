"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { BeerIcon as Baseball, Clock, Flag, Video } from "lucide-react"
import GameHeader from "./game-header"
import DisputePanel from "./dispute-panel"
import RulesChat from "./rules-chat"

export default function UmpireApp() {
  const [activeDispute, setActiveDispute] = useState<string | null>(null)
  const [reviewMode, setReviewMode] = useState(false)

  const handleDisputeResolution = (decision: string) => {
    // In a real app, this would communicate the decision
    setActiveDispute(null)
    setReviewMode(false)
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <Card className="border-2 border-navy-700 shadow-lg">
        <CardHeader className="bg-navy-800 text-white p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Baseball className="h-6 w-6" />
              <CardTitle className="text-xl font-bold">Umpire Assistant</CardTitle>
            </div>
            <Badge variant="outline" className="bg-red-600 text-white border-none">
              OFFICIAL
            </Badge>
          </div>
          <CardDescription className="text-slate-200">MLB Dispute Resolution System</CardDescription>
        </CardHeader>

        <GameHeader homeTeam="Yankees" awayTeam="Red Sox" homeScore={3} awayScore={2} inning="Bottom 7th" />

        {activeDispute ? (
          <DisputePanel
            type={activeDispute}
            onResolve={handleDisputeResolution}
            reviewMode={reviewMode}
            setReviewMode={setReviewMode}
          />
        ) : (
          <CardContent className="p-4">
            <Tabs defaultValue="calls" className="w-full">
              <TabsList className="grid grid-cols-3 mb-4">
                <TabsTrigger value="calls">Calls</TabsTrigger>
                <TabsTrigger value="rules">Rules</TabsTrigger>
                <TabsTrigger value="review">Review</TabsTrigger>
              </TabsList>

              <TabsContent value="calls" className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full justify-between text-left font-semibold border-navy-300"
                  onClick={() => setActiveDispute("safe-out")}
                >
                  Safe/Out Decision
                  <Flag className="h-4 w-4 text-red-600" />
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-between text-left font-semibold border-navy-300"
                  onClick={() => setActiveDispute("fair-foul")}
                >
                  Fair/Foul Ball
                  <Flag className="h-4 w-4 text-red-600" />
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-between text-left font-semibold border-navy-300"
                  onClick={() => setActiveDispute("catch-trap")}
                >
                  Catch/Trap Determination
                  <Flag className="h-4 w-4 text-red-600" />
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-between text-left font-semibold border-navy-300"
                  onClick={() => setActiveDispute("interference")}
                >
                  Interference Call
                  <Flag className="h-4 w-4 text-red-600" />
                </Button>
              </TabsContent>

              <TabsContent value="rules" className="space-y-3">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-bold">Rule Interpretations</h3>
                    <p className="text-sm text-slate-600">
                      Access official MLB rules and interpretations for dispute resolution.
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      <Button variant="secondary" className="text-sm">
                        Batter Rules
                      </Button>
                      <Button variant="secondary" className="text-sm">
                        Base Running
                      </Button>
                      <Button variant="secondary" className="text-sm">
                        Pitching Rules
                      </Button>
                      <Button variant="secondary" className="text-sm">
                        Field Play
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="font-bold">Ask About Rules</h3>
                    <p className="text-sm text-slate-600">
                      Get instant answers to your rules questions from our AI assistant.
                    </p>
                    <RulesChat />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="review" className="space-y-3">
                <div className="space-y-2">
                  <h3 className="font-bold">Video Review</h3>
                  <p className="text-sm text-slate-600">Request and review video footage of disputed plays.</p>
                  <Button className="w-full bg-navy-700 hover:bg-navy-800">
                    <Video className="mr-2 h-4 w-4" />
                    Request Video Review
                  </Button>
                  <div className="flex items-center space-x-2 mt-4">
                    <Switch id="challenge-mode" />
                    <Label htmlFor="challenge-mode">Manager Challenge Mode</Label>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        )}

        <CardFooter className="flex justify-between bg-slate-50 p-4 border-t">
          <div className="flex items-center text-sm text-slate-600">
            <Clock className="mr-1 h-4 w-4" />
            Game Time: 2:45
          </div>
          <Button variant="outline" size="sm" className="text-navy-700">
            Settings
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
