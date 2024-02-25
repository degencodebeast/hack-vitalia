import axios from 'axios';

import { NextResponse } from 'next/server';
import type { NextApiRequest, NextApiResponse } from 'next';


const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { data } = await axios.post(
      'https://api.huddle01.com/api/v1/create-room',
      {
        title: 'Huddle01 Meet',
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': process.env.API_KEY as string,
        },
      }
    );
 
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
};
 
export default handler;

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
