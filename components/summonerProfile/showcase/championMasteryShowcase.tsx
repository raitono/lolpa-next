import { useEffect, useState } from "react";
import { IChampionMastery } from "../../../models/championMastery";

interface ChampionMasteryShowcaseProps {
  championName?: string;
  summonerName: string;
  useHighest?: boolean;
}

const ChampionMasteryShowcase: React.FC<ChampionMasteryShowcaseProps> = ({ championName, summonerName, useHighest }: ChampionMasteryShowcaseProps) => {
  const [masteryData, setMasteryData] = useState<IChampionMastery>();
  const [champion, setChampion] = useState(championName);
  useEffect(() => {
    if (championName) {
      fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/summoner/NA1/${summonerName}/champion-mastery/${championName}`)
        .then(res => res.json())
        .then(setMasteryData)
    } else if (useHighest) {
      fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/summoner/NA1/${summonerName}/champion-mastery/highest`)
        .then(res => res.json())
        .then(setMasteryData)
        .then(() =>
          fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/champion/${masteryData?.championId}`)
            .then(res => res.json())
            .then(res => setChampion(res.name))
        )
    }
  }, [championName, useHighest]);

  if (masteryData && champion) {
    return (
      <>
        <div className="relative">
          <img className="w-200px" alt={champion} src={`http://ddragon.leagueoflegends.com/cdn/${process.env.NEXT_PUBLIC_CURRENT_PATCH}/img/champion/${champion}.png`} />
          <img className="absolute w-24 top-0 left-0" alt="Mastery Badge" src={`/champion-mastery/${masteryData.championLevel}.png`} />
          <span className="absolute bottom-1 left-1/2 transform -translate-x-1/2 text-alabaster text-6xl">{masteryData.championPoints.toLocaleString()}</span>
        </div>
      </>
    );
  }

  return <div></div>
};

export default ChampionMasteryShowcase;
