import type { NextApiRequest, NextApiResponse } from 'next';
import { LolApi } from 'twisted';
import { RegionGroups, Regions } from 'twisted/dist/constants';
import { MatchV5DTOs } from 'twisted/dist/models-dto';
import { Match } from '../../../../../db/entity/match';
import { mapper } from '../../../../../db/mapper';
import { MatchDto } from '../../../../../models/matchDto';

export default async (req: NextApiRequest, res: NextApiResponse<MatchV5DTOs.MatchDto[]>) => {
  if (!process.env.RIOT_API_KEY) {
    res.status(500).end("Riot API key missing");
    return;
  }

  if (req.method === "GET") {
    let { name } = req.query;
    name = Array.isArray(name) ? name[0] : name;

    const api = new LolApi(process.env.RIOT_API_KEY);
    const summoner = (await api.Summoner.getByName(name, Regions.AMERICA_NORTH)).response;
    const matchList: string[] = (await api.MatchV5.list(summoner.puuid, RegionGroups.AMERICAS, { count: 1, queue: 420 })).response;

    const matches = (await Promise.all(matchList.map(m => api.MatchV5.get(m, RegionGroups.AMERICAS)))).map(r => r.response);

    const matchesDto: MatchDto[] = matches;
    console.table(matchesDto[0]);
    const mappedMatch = mapper.map(matchesDto[0], Match, MatchDto);
    console.log(JSON.stringify(mappedMatch));

    res.status(200).json(matches);
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
