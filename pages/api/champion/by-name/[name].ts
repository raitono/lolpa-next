// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { LolApi } from 'twisted';
import { ChampionsDataDragonDetails } from 'twisted/dist/models-dto';

export default async (req: NextApiRequest, res: NextApiResponse<ChampionsDataDragonDetails>) => {
  if (!process.env.RIOT_API_KEY) {
    res.status(500).end({ message: "Riot API key missing" });
    return;
  }

  if (req.method === "GET") {
    let { name } = req.query;
    name = Array.isArray(name) ? name[0] : name;

    const api = new LolApi(process.env.RIOT_API_KEY);
    let champions = await api.DataDragon.getChampion();

    res.status(200).json(champions.data[name]);
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
