import type { NextApiRequest, NextApiResponse } from 'next';
import { LolApi } from 'twisted';
import RiotRunesDto from '../../../models/riot/riotRunesDto';

export default async (req: NextApiRequest, res: NextApiResponse<RiotRunesDto[]>) => {
  if (!process.env.RIOT_API_KEY) {
    res.status(500).end("Riot API key missing");
    return;
  }

  if (req.method === "GET") {
    const api = new LolApi(process.env.RIOT_API_KEY);
    const runes = <unknown>await api.DataDragon.getRunesReforged();
    res.status(200).json(runes as RiotRunesDto[]);
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
