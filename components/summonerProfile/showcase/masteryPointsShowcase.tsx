import { useEffect, useState } from "react";

interface MasteryPointShowcaseProps {
  summonerName: string;
}

const MasteryPointShowcase: React.FC<MasteryPointShowcaseProps> = ({ summonerName }: MasteryPointShowcaseProps) => {
  const [masteryPoints, setMasteryPoints] = useState<number>(0);

  useEffect(() => {
    if (summonerName) {
      fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/summoner/NA1/${summonerName}/champion-mastery/points`)
        .then(res => res.json())
        .then(setMasteryPoints);
    }
  }, [summonerName]);

  return (
    <>
      <div className="w-200px h-200px flex flex-col items-center bg-alabaster">
        <img className="w-28" alt="Mastery Badge" src={`/champion-mastery/7.png`} />
        <div className="text-3xl">Mastery Points</div>
        <span className="bottom-1 text-black text-5xl">{masteryPoints}</span>
      </div>
    </>
  );
}

export default MasteryPointShowcase;