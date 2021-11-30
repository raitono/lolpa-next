import type { NextApiRequest, NextApiResponse } from 'next';
import { IChampion } from '../../../../models/champion';

export default async (req: NextApiRequest, res: NextApiResponse<IChampion>) => {
  const { body, method } = req;

  if (method === 'POST') {
    try {
      res.status(201).json(body);
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(500).end(error.message);
      } else {
        res.status(500).end('Unknown server error');
      }
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
};