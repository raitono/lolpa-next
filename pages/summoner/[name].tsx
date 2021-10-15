import { useRouter } from 'next/router';
import ProfileHeader from "../../components/summonerProfile/profileHeader";

export default function SummonerProfile() {
  const router = useRouter();
  const { name } = router.query;

  if (name && !Array.isArray(name))
    return (
      <ProfileHeader summonerName={name} ></ProfileHeader>
    );
  else
    return (<div>Summoner not found</div>);
}