interface ProfileHeaderProps {
  summonerName: string;
  summonerLevel: number;
  profileIconId: number;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ summonerName, summonerLevel, profileIconId }: ProfileHeaderProps) => {
  return (
    <>
      <div className="flex flex-col p-2 bg-alabaster">
        <div className="relative w-300px m-auto">
          <img className="rounded-full"
            alt="Profile Icon"
            src={`http://ddragon.leagueoflegends.com/cdn/${process.env.NEXT_PUBLIC_CURRENT_PATCH}/img/profileicon/${profileIconId}.png`}></img>
          <div className="absolute bottom-0 right-0">
            <div className="flex items-center justify-center text-3xl font-black font-sans bg-alabaster border-jonquil border-8 rounded-full w-110px h-110px"><div>{summonerLevel}</div></div>
          </div>
        </div>
        <div className="text-7xl text-center pb-2">{summonerName}</div>
      </div>
    </>
  );
}

export default ProfileHeader;
