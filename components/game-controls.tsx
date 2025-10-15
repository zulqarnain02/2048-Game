"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"

type Direction = "up" | "down" | "left" | "right"

export function GameControls({
  size,
  onSizeChange,
  onRestart,
  onMove,
  disabled,
  className,
}: {
  size: number
  onSizeChange: (n: number) => void
  onRestart: () => void
  onMove: (dir: Direction) => void
  disabled?: boolean
  className?: string
}) {
  return (
    <Card className={cn("bg-white/30 border-2 border-white/40 shadow-lg backdrop-blur-md", className)}>
      <CardContent className="p-4 md:p-6 h-full">
        <div className="flex flex-col items-stretch justify-between gap-4 h-full">
          <div className="flex items-center gap-3">
            <div>
              <div className="text-sm text-gray-700 font-medium">Board Size</div>
              <Select value={String(size)} onValueChange={(v) => onSizeChange(Number(v))} disabled={disabled}>
                <SelectTrigger className="w-28 bg-white/50 border-white/60 text-gray-800 font-semibold">
                  <SelectValue placeholder="Size" />
                </SelectTrigger>
                <SelectContent className="bg-white/80 backdrop-blur-md">
                  {[3, 4, 5, 6, 7, 8].map((n) => (
                    <SelectItem key={n} value={String(n)} className="text-gray-800 focus:bg-white/50">
                      {n} x {n}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button
              variant="default"
              onClick={onRestart}
              className="bg-gradient-to-br from-purple-600 to-blue-500 text-white font-bold shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              Restart
            </Button>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div />
            <Button
              onClick={() => onMove("up")}
              disabled={disabled}
              aria-label="Move up"
              className="bg-white/40 text-gray-800 hover:bg-white/60 transition-colors duration-300"
            >
              ↑
            </Button>
            <div />
            <Button
              onClick={() => onMove("left")}
              disabled={disabled}
              aria-label="Move left"
              className="bg-white/40 text-gray-800 hover:bg-white/60 transition-colors duration-300"
            >
              ←
            </Button>
            <Button
              onClick={() => onMove("down")}
              disabled={disabled}
              aria-label="Move down"
              className="bg-white/40 text-gray-800 hover:bg-white/60 transition-colors duration-300"
            >
              ↓
            </Button>
            <Button
              onClick={() => onMove("right")}
              disabled={disabled}
              aria-label="Move right"
              className="bg-white/40 text-gray-800 hover:bg-white/60 transition-colors duration-300"
            >
              →
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
