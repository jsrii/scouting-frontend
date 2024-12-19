import { Divider, Skeleton } from "@nextui-org/react";

interface TeamStatsProps {
  epa: number;
  rank: number;
  wins: number;
  losses: number;
}

export default function TeamStats({ epa, rank, wins, losses }: TeamStatsProps) {
  return (
    <>
      <div className="flex flex-col items-center text-center">
        <div>EPA</div>
        {epa ? (
          <h1 className="text-4xl">{epa}</h1>
        ) : (
          <Skeleton className="size-10 rounded-lg" />
        )}
      </div>
      <Divider orientation="vertical" />
      <div className="flex flex-col items-center text-center">
        <div>Rank</div>
        {epa ? (
          <h1 className="text-4xl">{rank}</h1>
        ) : (
          <Skeleton className="size-10 rounded-lg" />
        )}
      </div>
      <Divider orientation="vertical" />
      <div className="flex flex-col items-center text-center">
        <div>Wins</div>
        {epa ? (
          <h1 className="text-4xl">{wins}</h1>
        ) : (
          <Skeleton className="size-10 rounded-lg" />
        )}
      </div>
      <Divider orientation="vertical" />
      <div className="flex flex-col items-center text-center">
        <div>Losses</div>
        {epa ? (
          <h1 className="text-4xl">{losses}</h1>
        ) : (
          <Skeleton className="size-10 rounded-lg" />
        )}
      </div>
    </>
  );
}
