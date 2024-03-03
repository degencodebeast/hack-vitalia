// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { AccessToken, Role } from '@huddle01/server-sdk/auth';
import Cors from 'cors';
import { mainHandler } from '@/utils/api-utils';

// const cors = Cors({
//   methods: ['POST', 'GET', 'HEAD'],
// });

// function runMiddleware(
//   req: NextApiRequest,
//   res: NextApiResponse,
//   fn: Function
// ) {
//   return new Promise((resolve, reject) => {
//     fn(req, res, (result: any) => {
//       if (result instanceof Error) {
//         return reject(result);
//       }

//       return resolve(result);
//     });
//   });
// }
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  return mainHandler(req, res, {
    POST,
  });
}

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  //await runMiddleware(req, res, cors);
  try {
    const { roomId } = req.query;

    if (!roomId) {
      return res.status(400).json({ error: 'roomId is required' });
    }

    const accessToken = new AccessToken({
      apiKey: process.env.HUDDLE_API_KEY as string,
      roomId: roomId as string,
      role: Role.HOST,
      permissions: {
        admin: true,
        canConsume: true,
        canProduce: true,
        canProduceSources: {
          cam: true,
          mic: true,
          screen: true,
        },
        canRecvData: true,
        canSendData: true,
        canUpdateMetadata: true,
      },
    });

    const token = await accessToken.toJwt();

    return res.status(200).json({ token, roomId });
  } catch (error) {
    return res.status(500).json({ error });
  }
}
