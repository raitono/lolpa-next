import type { NextApiRequest, NextApiResponse } from 'next';
import { LolApi } from 'twisted';
import { Regions } from 'twisted/dist/constants';
import { IChampionMastery } from '../../../../../../models/championMastery';

export default async (req: NextApiRequest, res: NextApiResponse<IChampionMastery>) => {
  if (!process.env.RIOT_API_KEY) {
    res.status(500).end({ message: "Riot API key missing" });
    return;
  }

  if (req.method === "GET") {
    let { region, name } = req.query;
    name = Array.isArray(name) ? name[0] : name;

    const api = new LolApi(process.env.RIOT_API_KEY);

    const summoner = await api.Summoner.getByName(name, Regions.AMERICA_NORTH);
    const championMastery: IChampionMastery = (await api.Champion.masteryBySummoner(summoner.response.id, Regions.AMERICA_NORTH)).response[0];

    res.status(200).json(championMastery);
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
