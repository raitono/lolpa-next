import type { NextApiRequest, NextApiResponse } from 'next';
import { LolApi } from 'twisted';
import { Regions } from 'twisted/dist/constants';
import createConnection from '../../../../db/getConnection';
import { Summoner as SummonerEntity } from '../../../../db/entity/summoner';
import { Summoner } from '../../../../models/summoner';

/**
 * Attempts to get a Summoner from the db
 * If not found, gets it from Riot instead
 */
export default async (req: NextApiRequest, res: NextApiResponse<Summoner>) => {
  if (!process.env.RIOT_API_KEY) {
    res.status(500).end({ message: "Riot API key missing" });
    return;
  }

  if (req.method === "GET") {
    let { name } = req.query;
    name = Array.isArray(name) ? name[0] : name;

    const conn = await createConnection();
    const summonerRepo = conn.getRepository(SummonerEntity);
    let summoner: Summoner | undefined = await summonerRepo.findOne({ name });

    if (!summoner) {
      try {
        console.debug(`Summoner ${name} not found, getting from Riot API...`)
        const api = new LolApi(process.env.RIOT_API_KEY);
        summoner = (await api.Summoner.getByName(name, Regions.AMERICA_NORTH)).response;

        console.debug(`Creating new Summoner ${name}`)
        const newSummoner = summonerRepo.create(summoner);
        summonerRepo.save(newSummoner);
      } catch (error: unknown) {
        res.status(404).end();
        return;
      }

    } else {
      console.debug(`Getting Summoner ${name} from db...`)
    }

    res.status(200).json(summoner);
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
