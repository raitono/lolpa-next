import type { NextApiRequest, NextApiResponse } from 'next';
import { LolApi } from 'twisted';
import { RegionGroups, Regions } from 'twisted/dist/constants';
import RiotLeagueEntryDTO from '../../../../../models/riot/riotLeagueEntryDTO';

export default async (req: NextApiRequest, res: NextApiResponse<RiotLeagueEntryDTO[]>) => {
  if (!process.env.RIOT_API_KEY) {
    res.status(500).end("Riot API key missing");
    return;
  }

  if (req.method === "GET") {
    let { name } = req.query;
    name = Array.isArray(name) ? name[0] : name;

    const api = new LolApi(process.env.RIOT_API_KEY);
    const summoner = (await api.Summoner.getByName(name, Regions.AMERICA_NORTH)).response;
    const leagueEntries: RiotLeagueEntryDTO[] = (await api.League.bySummoner(summoner.id, Regions.AMERICA_NORTH)).response;

    res.status(200).json(leagueEntries);
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
