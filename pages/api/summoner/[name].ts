import type { NextApiRequest, NextApiResponse } from 'next';
import { LolApi } from 'twisted';
import { Regions } from 'twisted/dist/constants';
import { ISummoner } from '../../../models/summoner';

export default async (req: NextApiRequest, res: NextApiResponse<ISummoner>) => {
  if (!process.env.RIOT_API_KEY) {
    res.status(500).end({ message: "Riot API key missing" });
    return;
  }

  if (req.method === "GET") {
    let { name } = req.query;
    name = Array.isArray(name) ? name[0] : name;

    const api = new LolApi(process.env.RIOT_API_KEY);
    let summoner: ISummoner = (await api.Summoner.getByName(name, Regions.AMERICA_NORTH)).response;

    res.status(200).json(summoner);
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
