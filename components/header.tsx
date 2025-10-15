"use client";

import { Button } from "@/components/ui/button";

const ScoreBox = ({ label, score }: { label: string; score: number }) => (
  <div className="bg-secondary rounded-lg p-3 text-center w-24 sm:w-28">
    <div className="text-sm font-semibold text-secondary-foreground/70">
      {label}
    </div>
    <div className="text-2xl font-bold text-secondary-foreground">{score}</div>
  </div>
);

export const Header = ({
  score,
  bestScore,
  onRestart,
  disabled,
}: {
  score: number;
  bestScore: number;
  onRestart: () => void;
  disabled: boolean;
}) => {
  return (
    <header className="w-full max-w-lg flex items-center justify-between">
      <div className="text-left">
        <h1 className="sm:text-6xl text-4xl font-bold text-foreground tracking-tighter">
          2048
        </h1>
        <p className="text-pretty text-muted-foreground mt-1">
          Join the numbers and get to the <strong>2048 tile!</strong>
        </p>
      </div>
      <div className="flex flex-col items-end gap-2">
        <div className="flex items-center gap-2">
          <ScoreBox label="SCORE" score={score} />
          <ScoreBox label="BEST" score={bestScore} />
        </div>
        <Button onClick={onRestart} disabled={disabled} className="w-full">
          New Game
        </Button>
      </div>
    </header>
  );
};
