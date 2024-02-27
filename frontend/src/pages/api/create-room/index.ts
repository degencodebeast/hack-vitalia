import axios from 'axios';

import { NextResponse } from 'next/server';
import type { NextApiRequest, NextApiResponse } from 'next';
import { mainHandler } from '@/utils/api-utils';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  return mainHandler(req, res, {
    POST,
  });
}
export const POST = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const response = await fetch(
      'https://api.huddle01.com/api/v1/create-room',
      {
        method: 'POST',
        body: JSON.stringify({
          title: 'HuddleMate AI',
          hostWallets: [],
        }),
        headers: {
          'Content-Type': 'application/json',
          //'x-api-key': process.env.HUDDLE_API_KEY || '',
          'x-api-key': "waJpOBHSCK60CYFI77XglmUwkjvSsq-a",
          //'x-api-key': 'qgoZqCLhcqDKyhAnNXKfXMvXGjmalEoy',
        },
      }
    );

    const { data } = await response.json();

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
};

//  async function handler() {
//   try {
//     const { data } = await axios.post(
//       'https://api.huddle01.com/api/v1/create-room',
//       {
//         title: 'Huddle01 Room',
//         roomLock: false,
//       },
//       {
//         headers: {
//           'Content-Type': 'application/json',
//           'x-api-key': process.env.HUDDLE_API_KEY as string,
//         },
//       }
//     );
//     return NextResponse.json(data, { status: 200 });
//     // res.status(200).json(data);
//   } catch (error) {
//     console.log('API', { error });

//     return NextResponse.json(error, { status: 500 });
//   }
// }

// export  {handler as GET, handler as POST}
