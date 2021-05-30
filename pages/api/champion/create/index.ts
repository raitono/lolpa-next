import type { NextApiRequest, NextApiResponse } from 'next';
import Champion, { IChampion } from '../../../../models/champion';
import { Database } from '../../../../models/database';

export default async (req: NextApiRequest, res: NextApiResponse<IChampion>) => {
  const {
    body,
    method,
  } = req

  if (method === 'POST') {
    try {
      await Database.run('mongodb://localhost:27017/lolpa', async () => {
        let newChampion = await createChampion(body);
        res.status(201).json(newChampion);
      });
    } catch (error) {
      res.status(500).end(error.message);
    }
  } else {
    res.setHeader('Allow', ['POST'])
    res.status(405).end(`Method ${method} Not Allowed`)
  }
};

const createChampion = (newChampion: IChampion) => {
  const championModel = new Champion(newChampion);
  return championModel.save();
}