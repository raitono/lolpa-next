// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { IChampion } from '../../../models/champion';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  let { id } = req.query;
  id = Array.isArray(id) ? id[0] : id;

  let champion: IChampion = { id, name:"Annie" };

  res.status(200).json(champion);
}
