import { db } from '@/db';
import { users } from '@/db/schema';
import { eq, or } from 'drizzle-orm';
import { NextApiRequest, NextApiResponse } from 'next';

export async function successHandlerCallback<T>(
  req: NextApiRequest,
  res: NextApiResponse,
  data: T,
  status = 200
): Promise<void> {
  return res.status(status).json(data);
}
export async function errorHandlerCallback<T>(
  req: NextApiRequest,
  res: NextApiResponse,
  data: T,
  status = 500
): Promise<void> {
  return res.status(status).json(data);
}

export type HTTP_METHOD = 'GET' | 'PUT' | 'POST' | 'DELETE';
export type HTTP_METHOD_CB = (
  req: NextApiRequest,
  res: NextApiResponse
) => Promise<void>;
export async function mainHandler(
  req: NextApiRequest,
  res: NextApiResponse,
  {
    GET,
    PUT,
    POST,
    DELETE,
  }: {
    GET?: HTTP_METHOD_CB;
    POST?: HTTP_METHOD_CB;
    PUT?: HTTP_METHOD_CB;
    DELETE?: HTTP_METHOD_CB;
  }
) {
  const method = req.method as HTTP_METHOD;
  switch (method) {
    case 'GET':
      return await GET?.(req, res);
    case 'POST':
      return await POST?.(req, res);
    case 'PUT':
      return PUT?.(req, res);
    case 'DELETE':
      return DELETE?.(req, res);

    default:
      return res.status(405).end();
  }
}

/*
 *   // query to select followers of a user
    const userId = 1;
    await db
      .select()
      .from(users)
      .leftJoin(follows, eq(users.id, follows.followerId))
      .where(eq(follows.followingId, userId));

    // query to select followings of a user
    await db
      .select()
      .from(users)
      .leftJoin(follows, eq(users.id, follows.followingId))
      .where(eq(follows.followerId, userId));

    // check if users are following themselves
    const userAId = 1;
    const userBId = 2;
    const isFollowing = await db
      .select({ isFollowing: sql`SELECT 1`})
      .from(follows)
      .where(
        and(eq(follows.followerId, userAId), eq(follows.followingId, userBId)),
      )
      .as("isFollowing");
 */
export const getUserFromDB = async (
  usernameOrIdOrAddress: string | number,
  columns = {}
) => {
  const defaultCols = {
    id: true,
    address: true,
    fullName: true,
    username: true,
    avatar: true,
    userType: true,
    role: true,
  };
  const cols = { ...defaultCols, ...columns };
  try {
    const user = await db.query.users.findFirst({
      where: or(
        eq(users.username, usernameOrIdOrAddress as string),
        eq(users.address, usernameOrIdOrAddress as string),
        eq(users.id, usernameOrIdOrAddress as number)
      ),
      columns: cols,
    });
    return user;
  } catch (error) {
    throw error;
  }
};
