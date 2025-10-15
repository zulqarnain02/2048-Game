"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  addRandomTile,
  has2048,
  initBoard,
  isGameOver,
  move,
  type Board,
  type Direction,
} from "@/lib/2048";
import { GameBoard } from "@/components/game-board";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/header";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

const BEST_SCORE_STORAGE_KEY = "2048-best-score";

// Simple game status
type Status = "playing" | "won" | "lost";

export default function Page() {
  const [size, setSize] = useState<number>(4);
  const [board, setBoard] = useState<Board>(() => initBoard(4));
  const [score, setScore] = useState<number>(0);
  const [bestScore, setBestScore] = useState<number>(0);
  const [status, setStatus] = useState<Status>("playing");

  // Load best score from local storage on mount
  useEffect(() => {
    const storedBestScore = localStorage.getItem(BEST_SCORE_STORAGE_KEY);
    if (storedBestScore) {
      setBestScore(Number(storedBestScore));
    }
  }, []);

  // Update best score when score changes
  useEffect(() => {
    if (score > bestScore) {
      setBestScore(score);
      localStorage.setItem(BEST_SCORE_STORAGE_KEY, String(score));
    }
  }, [score, bestScore]);

  const restart = useCallback(
    (newSize?: number) => {
      const s = newSize ?? size;
      setBoard(initBoard(s));
      setScore(0);
      setStatus("playing");
    },
    [size]
  );

  const handleSizeChange = useCallback(
    (n: number) => {
      setSize(n);
      restart(n);
    },
    [restart]
  );

  const handleMove = useCallback(
    (dir: Direction) => {
      if (status !== "playing") return;

      const result = move(board, dir);
      if (!result.moved) return;

      // If reached 2048, game ends immediately (no new tile)
      if (result.reached2048 || has2048(result.board)) {
        setBoard(result.board);
        setScore((s) => s + result.scoreGained);
        setStatus("won");
        return;
      }

      const withNewTile = addRandomTile(result.board);
      const nextScore = score + result.scoreGained;
      setBoard(withNewTile);
      setScore(nextScore);

      if (isGameOver(withNewTile)) {
        console.log("you lost the game on the move", dir);
        setStatus("lost");
      }
    },
    [board, score, status]
  );

  // Keyboard controls
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (status !== "playing") return;
      if (
        [
          "ArrowUp",
          "ArrowDown",
          "ArrowLeft",
          "ArrowRight",
          "w",
          "a",
          "s",
          "d",
          "W",
          "A",
          "S",
          "D",
        ].includes(e.key)
      ) {
        e.preventDefault();
      }
      switch (e.key) {
        case "ArrowUp":
        case "w":
        case "W":
          handleMove("up");
          break;
        case "ArrowDown":
        case "s":
        case "S":
          handleMove("down");
          break;
        case "ArrowLeft":
        case "a":
        case "A":
          handleMove("left");
          break;
        case "ArrowRight":
        case "d":
        case "D":
          handleMove("right");
          break;
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [handleMove, status]);

  const overlay = useMemo(() => {
    if (status === "playing") return null;
    const label = status === "won" ? "You reached 2048!" : "No more moves";
    return (
      <div
        className={cn(
          "absolute inset-0 rounded-lg",
          "bg-background/80 border border-border backdrop-blur-sm",
          "flex flex-col items-center justify-center gap-3"
        )}
        role="alert"
        aria-live="polite"
      >
        <div className="text-2xl font-semibold text-balance">{label}</div>
        <Button variant="default" onClick={() => restart()}>
          Play Again
        </Button>
      </div>
    );
  }, [restart, status]);

  return (
    <main className="container mx-auto p-4 flex flex-col items-center gap-4">
      <Header
        score={score}
        bestScore={bestScore}
        onRestart={() => restart()}
        disabled={status !== "playing"}
      />

      <div className="w-full max-w-lg flex items-center justify-end gap-2">
        <div className="flex items-center gap-2">
          <label
            htmlFor="board-size"
            className="text-sm font-medium text-gray-600"
          >
            Board Size
          </label>
          <Select
            value={String(size)}
            onValueChange={(val) => handleSizeChange(Number(val))}
            disabled={status !== "playing"}
          >
            <SelectTrigger id="board-size" className="w-24">
              <SelectValue placeholder="Select size" />
            </SelectTrigger>
            <SelectContent>
              {[3, 4, 5, 6, 7, 8].map((s) => (
                <SelectItem key={s} value={String(s)}>
                  {s} x {s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="relative w-full max-w-lg aspect-square">
        <GameBoard board={board} size={size} onMove={handleMove} />
        {overlay}
      </div>
    </main>
  );
}
