interface ProfileHeaderProps {
  summonerName: string;
  summonerLevel: number;
  profileIconId: number;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ summonerName, summonerLevel, profileIconId }: ProfileHeaderProps) => {
  return (
    <>
      <div className="flex flex-col p-2 bg-background-default">
        <div className="relative w-300px m-auto">
          <img className="rounded-full border-4 border-on-background-muted"
            alt="Profile Icon"
            src={`http://ddragon.leagueoflegends.com/cdn/${process.env.NEXT_PUBLIC_CURRENT_PATCH}/img/profileicon/${profileIconId}.png`}></img>
          <div className="absolute bottom-0 right-0">
            <div className="flex            text-3xl    text-on-background-default  border-on-foreground-default  w-24
                            items-center    font-medium bg-foreground-default       border-4 rounded-full         h-24
                            justify-center  font-sans">{summonerLevel}</div>
          </div>
        </div>
        <div className="text-7xl text-center text-on-background-default pb-2">{summonerName}</div>
      </div>
    </>
  );
}

export default ProfileHeader;
