import type { NextApiRequest, NextApiResponse } from 'next';

type Response = {
  name: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // const { name, message } = req.body;
  try {
    // const result = await someAsyncOperation();
    res.status(200).json({ result: 'BOOM WOR2KS' });
  } catch (err) {
    res.status(500).send({ error: 'failed to fetch data' });
  }
}
