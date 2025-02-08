import jwt from 'jsonwebtoken';
import type { NextApiHandler, NextApiResponse } from 'next';
import type { NextApiRequestWithUser, ClientModel } from '~/api/types';

export const generateJWT = ({ userId, email }: Pick<ClientModel['User'], 'userId' | 'email'>) => {
  if (!process.env.JWT_KEY) {
    throw new Error('Please define the JWT_KEY environment variable inside .env.local');
  }

  return jwt.sign({ userId, email }, process.env.JWT_KEY!);
};

export const verifyIfLoggedIn =
  (handler: NextApiHandler) => async (req: NextApiRequestWithUser, res: NextApiResponse) => {
    try {
      req.loggedInUser = await getLoggedInUser(req);
    } catch (error) {
      return res.status(500).json({ error: 'not authorised' });
    }

    return handler(req, res);
  };

export const getLoggedInUser = async (req: NextApiRequestWithUser) => {
  const jwtToken = req.cookies.authCookie;
  if (!jwtToken) {
    throw new Error('No auth token found');
  }
  return jwt.verify(jwtToken, process.env.JWT_KEY!) as ClientModel['User'];
};
