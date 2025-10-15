"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import { initBoard, move, addRandomTile, has2048, isGameOver, type Board } from "@/lib/2048"
import { GameBoard } from "@/components/game-board"
import { GameControls } from "@/components/game-controls"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { type Direction } from "@/lib/2048"

// Simple game status
type Status = "playing" | "won" | "lost"

export default function Page() {
  const [size, setSize] = useState<number>(4)
  const [board, setBoard] = useState<Board>(() => initBoard(4))
  const [score, setScore] = useState<number>(0)
  const [status, setStatus] = useState<Status>("playing")

  const restart = useCallback(
    (newSize?: number) => {
      const s = newSize ?? size
      setBoard(initBoard(s))
      setScore(0)
      setStatus("playing")
    },
    [size],
  )

  const handleSizeChange = useCallback(
    (n: number) => {
      setSize(n)
      restart(n)
    },
    [restart],
  )

  const handleMove = useCallback(
    (dir: Direction) => {
      if (status !== "playing") return

      const result = move(board, dir)
      if (!result.moved) return

      // If reached 2048, game ends immediately (no new tile)
      if (result.reached2048 || has2048(result.board)) {
        setBoard(result.board)
        setScore((s) => s + result.scoreGained)
        setStatus("won")
        return
      }

      const withNewTile = addRandomTile(result.board)
      const nextScore = score + result.scoreGained
      setBoard(withNewTile)
      setScore(nextScore)

      if (isGameOver(withNewTile)) {
        setStatus("lost")
      }
    },
    [board, score, status],
  )

  // Keyboard controls
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (status !== "playing") return
      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "w", "a", "s", "d", "W", "A", "S", "D"].includes(e.key)) {
        e.preventDefault()
      }
      switch (e.key) {
        case "ArrowUp":
        case "w":
        case "W":
          handleMove("up")
          break
        case "ArrowDown":
        case "s":
        case "S":
          handleMove("down")
          break
        case "ArrowLeft":
        case "a":
        case "A":
          handleMove("left")
          break
        case "ArrowRight":
        case "d":
        case "D":
          handleMove("right")
          break
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [handleMove, status])

  const overlay = useMemo(() => {
    if (status === "playing") return null
    const label = status === "won" ? "You reached 2048!" : "No more moves"
    return (
      <div
        className={cn(
          "absolute inset-0 rounded-lg",
          "bg-background/80 border border-border backdrop-blur-sm",
          "flex flex-col items-center justify-center gap-3",
        )}
        role="alert"
        aria-live="polite"
      >
        <div className="text-2xl font-semibold text-balance">{label}</div>
        <Button variant="default" onClick={() => restart()}>
          Play Again
        </Button>
      </div>
    )
  }, [restart, status])

  return (
    <main className="min-h-dvh flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <div className="grid md:grid-cols-2 md:gap-8 items-stretch">
          <div className="relative">
            <GameBoard board={board} size={size} onMove={handleMove} />
            {overlay}
          </div>

          <div className="space-y-4 flex flex-col">
            <Card className="bg-white/30 border-2 border-white/40 shadow-lg backdrop-blur-md">
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-balance text-5xl font-bold text-gray-800 tracking-wider">2048</CardTitle>
                <CardDescription className="text-pretty text-gray-600">
                  Join the numbers and get to the <strong>2048 tile!</strong>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between p-2 rounded-lg bg-white/20">
                  <div className="text-sm text-gray-700">
                    Board: <strong>{size} × {size}</strong>
                  </div>
                  <div className="text-sm font-medium text-gray-700">
                    Score: <span className="font-semibold text-gray-800">{score}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <GameControls
              className="flex-1"
              size={size}
              onSizeChange={handleSizeChange}
              onRestart={() => restart()}
              onMove={handleMove}
              disabled={status !== "playing"}
            />
          </div>
        </div>
      </div>
    </main>
  )
}
