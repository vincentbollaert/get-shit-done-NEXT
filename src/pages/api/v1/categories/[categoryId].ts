import type { NextApiResponse } from 'next';
import { verifyIfLoggedIn } from '~/api/auth';
import Category from '~/api/models/categoryModel';
import type { NextApiRequestWithUser } from '~/api/types';
import dbConnect from '~/api/utils/dbConnect';

async function handler(req: NextApiRequestWithUser, res: NextApiResponse) {
  await dbConnect();

  if (req.method === 'GET') {
    try {
      const categories = await Category.findById(req.query.categoryId);
      res.status(200).json(categories);
    } catch (err) {
      res.status(500).send({ errorMessage: 'could not find categories ' + err });
    }
  } else if (req.method === 'PATCH') {
    try {
      const category = await Category.findByIdAndUpdate(req.query.categoryId, req.body);
      res.status(200).json(category);
    } catch (err) {
      res.status(500).json({ errorMessage: 'could not update category ' + err });
    }
  } else if (req.method === 'DELETE') {
    try {
      const category = await Category.findByIdAndDelete(req.query.categoryId);
      res.status(200).json(category);
    } catch (err) {
      res.status(500).json({ errorMessage: 'could not remove category ' + err });
    }
  } else {
    res.status(404).json({ errorMessage: 'route not found' });
  }
}

export default verifyIfLoggedIn(handler);
