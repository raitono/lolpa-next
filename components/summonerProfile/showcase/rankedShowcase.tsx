import { useEffect, useState } from "react";
import RiotLeagueEntryDTO from "../../../models/riot/riotLeagueEntryDTO";
import RiotQueueType from "../../../models/riot/riotQueueType";

interface RankedShowcaseProps {
  summonerName: string;
  queueType: RiotQueueType;
}

const RankedShowcase: React.FC<RankedShowcaseProps> = ({ summonerName, queueType }: RankedShowcaseProps) => {
  const [leagueEntries, setLeagueEntries] = useState<RiotLeagueEntryDTO[]>();
  let rank: string = "Unranked"

  useEffect(() => {
    if (summonerName) {
      fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/summoner/NA1/${summonerName}/rank`)
        .then(res => res.json())
        .then(setLeagueEntries);
    }
  }, [summonerName]);

  if (leagueEntries) {
    rank = leagueEntries.filter(e => e.queueType === queueType).shift()?.tier || "Unranked";
  }

  return (
    <>
      <img className="w-200px h-200px bg-nord5" alt="ranked emblam" src={`/ranked-emblems/${rank}.png`} />
    </>
  );
}

export default RankedShowcase;