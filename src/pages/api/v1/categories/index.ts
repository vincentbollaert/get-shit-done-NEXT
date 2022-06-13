import type { NextApiResponse } from 'next';
import dbConnect from '~/api/utils/dbConnect';
import Category from '~/api/models/categoryModel';
import { verifyIfLoggedIn } from '~/api/auth';
import type { NextApiRequestWithUser } from '~/api/types';

async function handler(req: NextApiRequestWithUser, res: NextApiResponse) {
  await dbConnect();

  if (req.method === 'GET') {
    try {
      const categories = await Category.find();
      res.status(200).json(categories);
    } catch (err) {
      res.status(500).send({ errorMessage: 'could not find categories' });
    }
  } else if (req.method === 'POST') {
    try {
      const category = await new Category(req.body);
      category.save();
      res.status(200).json(category);
    } catch (error) {
      res.status(500).json({ errorMessage: 'could not add category' });
    }
  } else {
    res.status(404).json({ errorMessage: 'route not found' });
  }
}

export default verifyIfLoggedIn(handler);
