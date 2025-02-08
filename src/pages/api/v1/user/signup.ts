import type { NextApiRequest, NextApiResponse } from 'next';
import { generateJWT } from '~/api/auth';
import User from '~/api/models/userModel';
import type { Models } from '~/api/types';
import dbConnect from '~/api/utils/dbConnect';

// TODO: add the form validation middleware too
async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  if (req.method === 'POST') {
    try {
      const { email, password } = req.body;

      const foundUser = await User.findOne({ email });
      if (foundUser) {
        res.status(500).send({ errorMessage: 'email already in use' });
      }

      const userAttributes: Models['User'] = { email, password };
      const newUser = new User(userAttributes);
      newUser.save();

      const jwt = generateJWT({ userId: foundUser._id, email: foundUser.email });
      res.setHeader('Set-Cookie', `authCookie=${jwt}`);
      res.status(200).json(foundUser);
    } catch (err) {
      res.status(500).send({ errorMessage: 'Error idk something went wrong', err });
    }
  } else {
    res.status(404).json({ errorMessage: 'route not found' });
  }
}

export default handler;
