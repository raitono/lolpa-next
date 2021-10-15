import { useEffect, useState } from "react";
import { ISummoner } from "../../models/summoner";

interface ProfileHeaderProps {
  summonerName: string;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ summonerName }: ProfileHeaderProps) => {
  return (<div>Profile Header for {summonerName}</div>);
}

export default ProfileHeader;
