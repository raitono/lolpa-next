import { useEffect, useState } from "react";
import { IChampionMastery } from "../../../models/championMastery";

interface ChampionMasteryShowcaseProps {
  championName: string;
  summonerName: string;
}

const ChampionMasteryShowcase: React.FC<ChampionMasteryShowcaseProps> = ({ championName, summonerName }: ChampionMasteryShowcaseProps) => {
  const [masteryData, setMasteryData] = useState<IChampionMastery>();
  useEffect(() => {
    if (championName) {
      fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/summoner/NA1/${summonerName}/champion-mastery/${championName}`)
        .then(res => res.json())
        .then(setMasteryData)
    }
  }, [championName]);

  if (masteryData) {
    return (
      <>
        <div className="relative">
          <img className="w-150px" alt={championName} src={`http://ddragon.leagueoflegends.com/cdn/${process.env.NEXT_PUBLIC_CURRENT_PATCH}/img/champion/${championName}.png`} />
          <img className="absolute w-14 top-0 left-0" alt="Mastery Badge" src={`/champion-mastery/${masteryData.championLevel}.png`} />
          <span className="absolute bottom-1 left-3 text-alabaster font-medium text-4xl">{masteryData.championPoints.toLocaleString()}</span>
        </div>
      </>
    );
  }

  return <div></div>
};

export default ChampionMasteryShowcase;