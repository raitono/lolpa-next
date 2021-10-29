import type { NextApiRequest, NextApiResponse } from 'next';
import { LolApi } from 'twisted';
import { Regions } from 'twisted/dist/constants';

export default async (req: NextApiRequest, res: NextApiResponse<number>) => {
  if (!process.env.RIOT_API_KEY) {
    res.status(500).end({ message: "Riot API key missing" });
    return;
  }

  if (req.method === "GET") {
    let { region, name } = req.query;
    name = Array.isArray(name) ? name[0] : name;

    const api = new LolApi(process.env.RIOT_API_KEY);

    const summoner = await api.Summoner.getByName(name, Regions.AMERICA_NORTH);
    const masteryPoints: number = (await api.Champion.championsScore(summoner.response.id, Regions.AMERICA_NORTH)).score;

    res.status(200).json(masteryPoints);
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
