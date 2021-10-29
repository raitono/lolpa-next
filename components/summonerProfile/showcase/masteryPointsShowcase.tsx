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
      <div className="relative w-200px bg-alabaster">
        <img className="absolute w-32 top-0 left-1/2 transform -translate-x-1/2" alt="Mastery Badge" src={`/champion-mastery/7.png`} />
        <span className="absolute bottom-1 left-1/2 transform -translate-x-1/2 text-black text-6xl">{masteryPoints}</span>
      </div>
    </>
  );
}

export default MasteryPointShowcase;