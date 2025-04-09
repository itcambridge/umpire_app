"use client"

import { Button } from "@/components/ui/button"
import { CardContent } from "@/components/ui/card"
import { Check, ChevronLeft, Video, X } from "lucide-react"

interface DisputePanelProps {
  type: string
  onResolve: (decision: string) => void
  reviewMode: boolean
  setReviewMode: (mode: boolean) => void
}

export default function DisputePanel({ type, onResolve, reviewMode, setReviewMode }: DisputePanelProps) {
  const getDisputeTitle = () => {
    switch (type) {
      case "safe-out":
        return "Safe/Out Decision"
      case "fair-foul":
        return "Fair/Foul Ball"
      case "catch-trap":
        return "Catch/Trap Determination"
      case "interference":
        return "Interference Call"
      default:
        return "Dispute Resolution"
    }
  }

  const getDisputeOptions = () => {
    switch (type) {
      case "safe-out":
        return [
          { label: "SAFE", value: "safe", color: "bg-green-600 hover:bg-green-700" },
          { label: "OUT", value: "out", color: "bg-red-600 hover:bg-red-700" },
        ]
      case "fair-foul":
        return [
          { label: "FAIR", value: "fair", color: "bg-green-600 hover:bg-green-700" },
          { label: "FOUL", value: "foul", color: "bg-red-600 hover:bg-red-700" },
        ]
      case "catch-trap":
        return [
          { label: "CATCH", value: "catch", color: "bg-green-600 hover:bg-green-700" },
          { label: "NO CATCH", value: "no-catch", color: "bg-red-600 hover:bg-red-700" },
        ]
      case "interference":
        return [
          { label: "INTERFERENCE", value: "interference", color: "bg-red-600 hover:bg-red-700" },
          { label: "NO INTERFERENCE", value: "no-interference", color: "bg-green-600 hover:bg-green-700" },
        ]
      default:
        return [
          { label: "CONFIRM", value: "confirm", color: "bg-green-600 hover:bg-green-700" },
          { label: "OVERTURN", value: "overturn", color: "bg-red-600 hover:bg-red-700" },
        ]
    }
  }

  return (
    <CardContent className="p-4 space-y-4">
      <div className="flex items-center">
        <Button variant="ghost" size="sm" className="p-0 mr-2" onClick={() => onResolve("cancel")}>
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <h3 className="font-bold text-lg">{getDisputeTitle()}</h3>
      </div>

      {reviewMode ? (
        <div className="space-y-4">
          <div className="bg-slate-800 rounded-md aspect-video flex items-center justify-center">
            <Video className="h-12 w-12 text-slate-400" />
            <span className="sr-only">Video review placeholder</span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Button className="bg-slate-700 hover:bg-slate-800" onClick={() => setReviewMode(false)}>
              <X className="mr-2 h-4 w-4" />
              Exit Review
            </Button>
            <Button className="bg-navy-700 hover:bg-navy-800" onClick={() => setReviewMode(false)}>
              <Check className="mr-2 h-4 w-4" />
              Confirm Review
            </Button>
          </div>
        </div>
      ) : (
        <>
          <div className="p-3 bg-slate-100 rounded-md border border-slate-300">
            <p className="text-sm font-medium">Play Description:</p>
            <p className="text-sm text-slate-600">
              {type === "safe-out" && "Runner advancing to 2nd base, tag applied by shortstop."}
              {type === "fair-foul" && "Ball hit down the left field line, landed near the foul pole."}
              {type === "catch-trap" && "Outfielder diving catch attempt, ball may have touched ground."}
              {type === "interference" && "Possible catcher interference on batter's swing."}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Button className="bg-navy-700 hover:bg-navy-800" onClick={() => setReviewMode(true)}>
              <Video className="mr-2 h-4 w-4" />
              Review Play
            </Button>

            <Button
              variant="outline"
              className="border-red-600 text-red-600 hover:bg-red-50"
              onClick={() => onResolve("cancel")}
            >
              Cancel
            </Button>
          </div>

          <div className="pt-2 border-t">
            <p className="font-bold mb-2">Make Decision:</p>
            <div className="grid grid-cols-2 gap-3">
              {getDisputeOptions().map((option) => (
                <Button
                  key={option.value}
                  className={`font-bold ${option.color}`}
                  onClick={() => onResolve(option.value)}
                >
                  {option.label}
                </Button>
              ))}
            </div>
          </div>
        </>
      )}
    </CardContent>
  )
}
