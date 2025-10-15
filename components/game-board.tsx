"use client"
import type { Board } from "@/lib/2048"
import { cn } from "@/lib/utils"

// Simple token-aligned tile styling with 4 tiers
function tileClasses(value: number) {
  const base = "flex items-center justify-center rounded-md text-white font-bold shadow-lg transition-all duration-300 ease-in-out";
  const colorMap: { [key: number]: string } = {
    0: "bg-gray-300/50 text-gray-500",
    2: "bg-[#eee4da] text-[#776e65]",
    4: "bg-[#ede0c8] text-[#776e65]",
    8: "bg-[#f2b179] text-white",
    16: "bg-[#f59563] text-white",
    32: "bg-[#f67c5f] text-white",
    64: "bg-[#f65e3b] text-white",
    128: "bg-[#edcf72] text-white",
    256: "bg-[#edcc61] text-white",
    512: "bg-[#edc850] text-white",
    1024: "bg-[#edc53f] text-white",
    2048: "bg-[#edc22e] text-white",
  };
  return cn(base, colorMap[value] || "bg-black text-white");
}

function fontSize(value: number) {
  const len = String(value).length
  if (value === 0) return "text-sm md:text-base"
  if (len <= 2) return "text-xl md:text-2xl font-semibold"
  if (len === 3) return "text-lg md:text-xl font-semibold"
  return "text-base md:text-lg font-semibold"
}

export function GameBoard({
  board,
  size,
}: {
  board: Board
  size: number
}) {
  return (
    <div
      role="grid"
      aria-label={`2048 board ${size} by ${size}`}
      className={cn(
        "rounded-lg p-3 md:p-4 bg-white/30 border-2 border-white/40 shadow-lg backdrop-blur-md h-full",
        "relative", // Needed for tile animations
      )}
    >
      <div
        className="grid gap-2 md:gap-3"
        style={{
          gridTemplateColumns: `repeat(${size}, minmax(0, 1fr))`,
        }}
      >
        {board.map((row, rIdx) =>
          row.map((value, cIdx) => (
            <div
              key={`${rIdx}-${cIdx}`}
              role="gridcell"
              aria-label={value === 0 ? "empty" : `${value}`}
              className={cn(
                "aspect-square rounded-md md:rounded-lg",
                "flex items-center justify-center select-none",
                tileClasses(value),
                "transition-all duration-300 ease-in-out", // General transition for all properties
                // Add a scale effect for new tiles
                value !== 0 ? "animate-tile-pop" : "",
              )}
            >
              <span className={cn("leading-none", fontSize(value))}>{value === 0 ? "" : value}</span>
            </div>
          )),
        )}
      </div>
    </div>
  )
}
