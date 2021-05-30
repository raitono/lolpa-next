// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { LolApi } from 'twisted';
import { IChampion } from '../../../models/champion';

export default async (req: NextApiRequest, res: NextApiResponse<IChampion>) => {
  if (!process.env.RIOT_API_KEY) {
    res.status(500).end({message: "Riot API key missing"});
    return;
  }

  const api = new LolApi(process.env.RIOT_API_KEY);
  if (req.method === "GET") {
    let { id } = req.query;
    id = Array.isArray(id) ? id[0] : id;

    let champion: IChampion = await api.DataDragon.getChampion(Number.parseInt(id));

    res.status(200).json(champion);
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
