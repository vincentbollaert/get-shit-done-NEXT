import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '~/lib/dbConnect';
import User, { UserAttributes } from '~/models/userModel';
import { generateJWT } from '~/api/auth';

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

      const userAttributes: UserAttributes = { email, password };
      const newUser = new User(userAttributes);
      newUser.save();

      const jwt = generateJWT({ userId: foundUser._id, email: foundUser.email });
      res.setHeader('Set-Cookie', `authCookie=${jwt}`);
      res.status(200).json({ data: foundUser });
    } catch (err) {
      res.status(500).send({ errorMessage: 'Error idk something went wrong', err });
    }
  } else {
    res.status(404).json({ errorMessage: 'route not found' });
  }
}

export default handler;
