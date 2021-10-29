import ChampionMasteryShowcase from "./showcase/championMasteryShowcase";
import MasteryPointShowcase from "./showcase/masteryPointsShowcase";

interface ProfileShowcaseProps {
  summonerName: string;
}

const ProfileShowcase: React.FC<ProfileShowcaseProps> = ({ summonerName }: ProfileShowcaseProps) => {
  return (
    <div className="flex justify-between m-2">
      <ChampionMasteryShowcase summonerName={summonerName} useHighest />
      <MasteryPointShowcase summonerName={summonerName} />
    </div>
  );
}

export default ProfileShowcase;
