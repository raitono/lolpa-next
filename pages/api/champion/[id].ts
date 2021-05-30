// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import Champion, { IChampion } from '../../../models/champion';
import { Database } from '../../../models/database';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  let { id } = req.query;
  id = Array.isArray(id) ? id[0] : id;

  try {
    let champion: IChampion = await Database.run('mongodb://localhost:27017/lolpa', () => Champion.findOne({id}).exec());

    res.status(200).json(champion);
  } catch (error) {
    res.status(500).end(error.message);
  }
}
