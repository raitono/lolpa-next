import type { NextApiRequest, NextApiResponse } from 'next';
import { LolApi } from 'twisted';
import { RegionGroups } from 'twisted/dist/constants';

export default async (req: NextApiRequest, res: NextApiResponse<string[]>) => {
  if (!process.env.RIOT_API_KEY) {
    res.status(500).end("Riot API key missing");
    return;
  }

  if (req.method === "GET") {
    let { name: puuid } = req.query;
    puuid = Array.isArray(puuid) ? puuid[0] : puuid;

    if (puuid.length <= 16) {
      res.status(400).end("PUUID expected");
      return;
    }

    const api = new LolApi(process.env.RIOT_API_KEY);
    let matchList: string[] = (await api.MatchV5.list(puuid, RegionGroups.AMERICAS, { count: 1 })).response;

    res.status(200).json(matchList);
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
