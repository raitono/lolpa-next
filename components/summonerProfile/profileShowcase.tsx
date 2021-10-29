import ChampionMasteryShowcase from "./showcase/championMasteryShowcase";

interface ProfileShowcaseProps {
  summonerName: string;
}

const ProfileShowcase: React.FC<ProfileShowcaseProps> = ({ summonerName }: ProfileShowcaseProps) => {
  return (
    <div className="flex justify-between m-2">
      <ChampionMasteryShowcase summonerName={summonerName} useHighest />
    </div>
  );
}

export default ProfileShowcase;
