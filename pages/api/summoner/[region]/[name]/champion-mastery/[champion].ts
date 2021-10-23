import type { NextApiRequest, NextApiResponse } from 'next';
import { LolApi } from 'twisted';
import { Regions } from 'twisted/dist/constants';
import { ChampionsDataDragonDetails } from 'twisted/dist/models-dto';
import { IChampionMastery } from '../../../../../../models/championMastery';

export default async (req: NextApiRequest, res: NextApiResponse<IChampionMastery>) => {
  if (!process.env.RIOT_API_KEY) {
    res.status(500).end({ message: "Riot API key missing" });
    return;
  }

  if (req.method === "GET") {
    let { region, name, champion } = req.query;
    name = Array.isArray(name) ? name[0] : name;
    champion = Array.isArray(champion) ? champion[0] : champion;

    const api = new LolApi(process.env.RIOT_API_KEY);

    const summoner = await api.Summoner.getByName(name, Regions.AMERICA_NORTH);
    const championDetails: ChampionsDataDragonDetails = await (await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/champion/by-name/${champion}`)).json();
    const championMastery: IChampionMastery = (await api.Champion.masteryBySummonerChampion(summoner.response.id, Number.parseInt(championDetails.key), Regions.AMERICA_NORTH)).response;

    res.status(200).json(championMastery);
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
