import { db } from '@/db';
import { mealPlans } from '@/db/schema';
import {
  HTTP_METHOD_CB,
  errorHandlerCallback,
  mainHandler,
  successHandlerCallback,
} from '@/utils/api-utils';
import { NextApiRequest, NextApiResponse } from 'next';
import dotenv from 'dotenv';
import { IS_DEV } from '@/utils';
import { eq } from 'drizzle-orm';
dotenv.config();

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
  try {
    const allmealPlans = await db.query.mealPlans.findMany({
      where: eq(mealPlans.status, 'published'),
      with: {
        author: {
          columns: {
            id: true,
            fullName: true,
            avatar: true,
            username: true,
            address: true,
          },
        },
      },
    });
    return await successHandlerCallback(req, res, {
      message: 'mealPlans retrieved successfully',
      data: allmealPlans,
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
    const { status, ...rest } = req.body;

    if (status === 'DRAFT') {
      await db.insert(mealPlans).values({ ...rest, status });
      return await successHandlerCallback(req, res, {
        message: 'Draft saved successfully',
      });
    }

    const createdMealplan = await db.transaction(async (tx) => {
      const [insertRes] = await tx.insert(mealPlans).values({ ...rest, status });
      return await tx.query.mealPlans.findFirst({
        where: eq(mealPlans.id, insertRes.insertId),
      });
    });

    return await successHandlerCallback(
      req,
      res,
      {
        message: 'Meal plan created successfully',
        data: createdMealplan,
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
