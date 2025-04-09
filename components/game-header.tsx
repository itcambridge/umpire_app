interface GameHeaderProps {
  homeTeam: string
  awayTeam: string
  homeScore: number
  awayScore: number
  inning: string
}

export default function GameHeader({ homeTeam, awayTeam, homeScore, awayScore, inning }: GameHeaderProps) {
  return (
    <div className="bg-slate-800 text-white p-3 flex justify-between items-center">
      <div className="flex flex-col items-center">
        <span className="text-xs text-slate-300">AWAY</span>
        <span className="font-bold">{awayTeam}</span>
        <span className="text-xl font-bold">{awayScore}</span>
      </div>

      <div className="flex flex-col items-center">
        <span className="text-xs text-slate-300">INNING</span>
        <span className="font-bold text-amber-400">{inning}</span>
        <div className="flex space-x-1 mt-1">
          <span className="w-2 h-2 rounded-full bg-amber-400"></span>
          <span className="w-2 h-2 rounded-full bg-amber-400"></span>
          <span className="w-2 h-2 rounded-full bg-slate-600"></span>
        </div>
      </div>

      <div className="flex flex-col items-center">
        <span className="text-xs text-slate-300">HOME</span>
        <span className="font-bold">{homeTeam}</span>
        <span className="text-xl font-bold">{homeScore}</span>
      </div>
    </div>
  )
}
