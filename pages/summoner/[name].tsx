import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { ISummoner } from '../../models/summoner';

import ProfileHeader from "../../components/summonerProfile/profileHeader";
import SearchHeader from '../../components/searchHeader';
import ProfileShowcase from '../../components/summonerProfile/profileShowcase';
import MatchList from '../../components/summonerProfile/tabs/matchList';

export default function SummonerProfile() {
  const router = useRouter();
  const { name } = router.query;

  const [summoner, setSummoner] = useState<ISummoner>();
  useEffect(() => {
    if (name) {
      fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/summoner/NA1/${name}`)
        .then(response => response.json())
        .then(setSummoner);
    }
  }, [name]);

  if (name && summoner)
    return (
      <div className="bg-background-default h-full">
        <SearchHeader />
        <div className="container">
          <ProfileHeader summonerName={summoner.name} summonerLevel={summoner.summonerLevel} profileIconId={summoner.profileIconId} ></ProfileHeader>
          <ProfileShowcase summonerName={summoner.name} />
          <MatchList summonerName={summoner.name} />
        </div>
      </div>
    );
  else
    return (<div>Summoner not found</div>);
}