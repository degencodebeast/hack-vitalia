import { db } from '@/db';
import { users } from '@/db/schema';
import {
  HTTP_METHOD_CB,
  errorHandlerCallback,
  mainHandler,
  successHandlerCallback,
} from '@/utils/api-utils';
import { NextApiRequest, NextApiResponse } from 'next';

import { IS_DEV } from '@/utils';
import { desc, eq, or } from 'drizzle-orm';
import { USER_TYPE } from '@/types/shared';
export const config = {
  api: {
    bodyParser: {
      sizeLimit: '4mb',
    },
  },
};
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  return mainHandler(req, res, {
    GET,
    POST,
  });
}

export const GET: HTTP_METHOD_CB = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { t: type = 'member', r: role } = req.query;
  let whereFilter =
    type == 'all'
      ? {
          where: or(
            eq(users.userType, 'member'),
            eq(users.userType, 'nutritionist')
          ),
        }
      : { where: eq(users.userType, type as USER_TYPE) };
  // if (type == 'all' && role) {
  //   whereFilter = {
  //     where: and(eq(users.role, role as USER_ROLE)),
  //   };
  // } else if (role && type !== 'all') {
  //   whereFilter = {
  //     where: and(
  //       eq(users.status, type as USER_TYPE),
  //       eq(users.authorAddress, role as string)
  //     ),
  //   };
  // }

  try {
    const allusers = await db.query.users.findMany({
      ...whereFilter,
      orderBy: desc(users.createdAt),
      columns: {
        password: false,
        email: false,
      },
    });
    return await successHandlerCallback(req, res, {
      message: 'users retrieved successfully',
      data: allusers,
    });
  } catch (error: any) {
    return await errorHandlerCallback(req, res, {
      message: 'Something went wrong...',
      error: IS_DEV ? { ...error } : null,
    });
  }
};
export const POST: HTTP_METHOD_CB = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const { role, ...rest } = req.body;

    const createdUser = await db.transaction(async (tx) => {
      const [insertRes] = await tx
        .insert(users)
        .values({ ...rest, role: 'user' });
      return await tx.query.users.findFirst({
        columns: {
          password: false,
          email: false,
        },
        where: eq(users.id, insertRes.insertId),
      });
    });

    return await successHandlerCallback(
      req,
      res,
      {
        message: 'User created successfully',
        data: createdUser,
      },
      201
    );
  } catch (error: any) {
    return await errorHandlerCallback(req, res, {
      message: 'Something went wrong...',
      error: IS_DEV ? { ...error } : null,
    });
  }
};
