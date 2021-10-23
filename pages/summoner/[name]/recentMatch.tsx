import { useEffect, useState } from "react";
import { useRouter } from 'next/router';

export default function RecentMatch() {
  const router = useRouter();
  const { name } = router.query;
  const [summoner, setSummoner] = useState<ISummoner>();
  const [matchList, setMatchList] = useState<string[]>();

  interface ISummoner {
    puuid: string,
    name: string
  }

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/summoner/${name}`)
      .then(response => response.json())
      .then(setSummoner);
  }, [name]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/summoner/${summoner?.puuid}/recentMatches`)
      .then(response => response.json())
      .then(setMatchList);
  }, [summoner]);

  if (summoner && matchList)
    return (<>
      <div>Summoner Name: {summoner.name}</div>
      <div>Summoner Puuid: {summoner.puuid}</div>
      {matchList.map(match => <div>{match}</div>)}
    </>
    );
  else
    return (<div>Gathering matches....</div>);
}
