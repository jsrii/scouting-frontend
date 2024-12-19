import { Skeleton } from "@nextui-org/react";

interface TeamStatsProps {
  teamName: string;
}

export default function TeamName({ teamName }: TeamStatsProps) {
  return teamName ? (
    <h3 className="text-2xl text-foreground-400">{teamName}</h3>
  ) : (
    <Skeleton className="w-72 h-8 rounded-lg" />
  );
}
