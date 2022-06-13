import type { NextApiResponse } from 'next';
import dbConnect from '~/api/utils/dbConnect';
import Category from '~/api/models/categoryModel';
import { verifyIfLoggedIn } from '~/api/auth';
import type { NextApiRequestWithUser } from '~/api/types';

async function handler(req: NextApiRequestWithUser, res: NextApiResponse) {
  await dbConnect();

  if (req.method === 'GET') {
    try {
      const categories = await Category.findById(req.query.categoryId);
      res.status(200).json(categories);
    } catch (err) {
      res.status(500).send({ errorMessage: 'could not find categories' });
    }
  } else if (req.method === 'PATCH') {
    try {
      const category = await Category.findByIdAndUpdate(req.query.categoryId, req.body);
      res.status(200).json(category);
    } catch (error) {
      res.status(500).json({ errorMessage: 'could not update category' });
    }
  } else if (req.method === 'DELETE') {
    try {
      const category = await Category.findByIdAndDelete(req.query.categoryId);
      res.status(200).json(category);
    } catch (error) {
      res.status(500).json({ errorMessage: 'could not remove category' });
    }
  } else {
    res.status(404).json({ errorMessage: 'route not found' });
  }
}

export default verifyIfLoggedIn(handler);
