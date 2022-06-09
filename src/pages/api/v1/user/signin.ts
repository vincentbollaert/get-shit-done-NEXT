import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '~/api/utils/dbConnect';
import { Password } from '~/api/utils/password';
import User from '~/api/models/userModel';
import { generateJWT } from '~/api/auth';

// TODO: add the form validation middleware too
async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  if (req.method === 'POST') {
    try {
      const { email, password } = req.body;

      const foundUser = await User.findOne({ email });
      if (!foundUser) {
        res.status(500).send({ errorMessage: 'invalid credentials' });
      }

      const isPasswordCorrect = await Password.compare(foundUser.password, password);
      if (isPasswordCorrect) {
        const jwt = generateJWT({ userId: foundUser._id, email: foundUser.email });
        res.setHeader('Set-Cookie', `authCookie=${jwt}; path=/`);
        res.status(200).json(foundUser);
      } else {
        res.status(500).send({ errorMessage: 'passwords do not match' });
      }
    } catch (err) {
      res.status(500).send({ errorMessage: 'Error idk something went wrong', err });
    }
  } else {
    res.status(404).json({ errorMessage: 'route not found' });
  }
}

export default handler;
