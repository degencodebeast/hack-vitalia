import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  APIResponse,
  Article,
  MealPlan,
  NewMealPlan,
  FitnessPlan,
  NewArticle,
  NewFitnessPlan,
  IUser,
  USER_TYPE,
  NewUser,
} from '@/types/shared';
import { objectToSearchParams } from '@/utils';

// Define a service using a base URL and expected endpoints

export const RejuvenateApi = createApi({
  reducerPath: 'RejuvenateApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/',
  }),
  tagTypes: ['Articles', 'MealPlans', 'FitnessPlans', 'Users'],

  endpoints: (builder) => ({
    getArticles: builder.query<
      Partial<APIResponse<Article[]>>,
      { s?: 'all' | 'published' | 'draft'; ad?: string }
    >({
      query: (params) => {
        return {
          url: `articles?${objectToSearchParams(params)}`,
        };
      },
      providesTags: (result) =>
        // is result available?
        result?.data
          ? // successful query
            [
              ...result?.data.map(({ slug }) => ({
                type: 'Articles' as const,
                id: slug,
              })),
              { type: 'Articles', id: 'LIST' },
            ]
          : // an error occurred, but we still want to refetch this query when `{ type: 'Articles', id: 'LIST' }` is invalidated
            [{ type: 'Articles', id: 'LIST' }],
    }),
    getMealPlans: builder.query<
      Partial<APIResponse<MealPlan[]>>,
      { s?: 'all' | 'published' | 'draft'; ad?: string }
    >({
      query: (params) => {
        return {
          url: `meal-plans?${objectToSearchParams(params)}`,
        };
      },
      providesTags: (result) =>
        // is result available?
        result?.data
          ? // successful query
            [
              ...result?.data.map(({ slug }) => ({
                type: 'MealPlans' as const,
                id: slug,
              })),
              { type: 'MealPlans', id: 'LIST' },
            ]
          : // an error occurred, but we still want to refetch this query when `{ type: 'MealPlans', id: 'LIST' }` is invalidated
            [{ type: 'MealPlans', id: 'LIST' }],
    }),
    getFitnessPlans: builder.query<
      Partial<APIResponse<FitnessPlan[]>>,
      { s?: 'all' | 'published' | 'draft'; ad?: string }
    >({
      query: (params) => {
        return {
          url: `fitness-plans?${objectToSearchParams(params)}`,
        };
      },
      providesTags: (result) =>
        // is result available?
        result?.data
          ? // successful query
            [
              ...result?.data.map(({ slug }) => ({
                type: 'FitnessPlans' as const,
                id: slug,
              })),
              { type: 'FitnessPlans', id: 'LIST' },
            ]
          : // an error occurred, but we still want to refetch this query when `{ type: 'MealPlans', id: 'LIST' }` is invalidated
            [{ type: 'FitnessPlans', id: 'LIST' }],
    }),
    getUsers: builder.query<
      Partial<APIResponse<IUser[]>>,
      { t: 'member' | 'nutritionist' | 'all' }
    >({
      query: ({ t }) => {
        return {
          url: `users?t=${t}`,
        };
      },
      providesTags: (result) =>
        // is result available?
        result?.data
          ? // successful query
            [
              ...result?.data.map(({ id }) => ({
                type: 'Users' as const,
                id: id,
              })),
              { type: 'Users', id: 'LIST' },
            ]
          : [{ type: 'Users', id: 'LIST' }],
    }),
    getUser: builder.query<
      Partial<APIResponse<Article>>,
      { usernameOrAddress: string }
    >({
      query: ({ usernameOrAddress }) => `articles/${usernameOrAddress}`,
      providesTags: (result, error, { usernameOrAddress }) => {
        return [{ type: 'Users' as const, id: usernameOrAddress }];
      },
    }),
    getArticle: builder.query<
      Partial<APIResponse<Article>>,
      { slug: string; use_id?: boolean }
    >({
      query: ({ slug, use_id = false }) => `articles/${slug}?use_id=${use_id}`,
      providesTags: (result, error, { slug }) => {
        return [{ type: 'Articles' as const, id: slug }];
      },
    }),
    getMealPlan: builder.query<
      Partial<APIResponse<MealPlan>>,
      { slug: string; use_id?: boolean }
    >({
      query: ({ slug, use_id = false }) =>
        `meal-plans/${slug}?use_id=${use_id}`,
      providesTags: (result, error, { slug }) => {
        return [{ type: 'MealPlans' as const, id: slug }];
      },
    }),
    getFitnessPlan: builder.query<
      Partial<APIResponse<FitnessPlan>>,
      { slug: string; use_id?: boolean }
    >({
      query: ({ slug, use_id = false }) =>
        `fitness-plans/${slug}?use_id=${use_id}`,
      providesTags: (result, error, { slug }) => {
        return [{ type: 'FitnessPlans' as const, id: slug }];
      },
    }),

    addUser: builder.mutation<APIResponse<IUser>, NewUser>({
      query: (data) => ({
        url: `users`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: [{ type: 'Articles' as const, id: 'LIST' }],
    }),
    addArticle: builder.mutation<APIResponse<Article>, NewArticle>({
      query: (data) => ({
        url: `articles`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: [{ type: 'Articles' as const, id: 'LIST' }],
    }),
    addFitnessPlan: builder.mutation<APIResponse<FitnessPlan>, NewFitnessPlan>({
      query: (data) => ({
        url: `fitness-plans`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: [{ type: 'FitnessPlans' as const, id: 'LIST' }],
    }),
    addMealPlan: builder.mutation<APIResponse<MealPlan>, NewMealPlan>({
      query: ({ ...rest }) => ({
        url: `meal-plans`,
        method: 'POST',
        body: { ...rest },
      }),
      invalidatesTags: [{ type: 'MealPlans' as const, id: 'LIST' }],
    }),
    updateArticle: builder.mutation<APIResponse<Article>, Partial<Article>>({
      query(data) {
        const { slug, ...body } = data;
        return {
          url: `articles/${slug}`,
          method: 'PUT',
          body,
        };
      },

      invalidatesTags: (result, error, { slug }) => [
        { type: 'Articles', id: slug },
      ],
    }),
    updateFitnessPlan: builder.mutation<
      APIResponse<FitnessPlan>,
      Partial<FitnessPlan>
    >({
      query(data) {
        const { slug, ...body } = data;
        return {
          url: `fitness-plans/${slug}`,
          method: 'PUT',
          body,
        };
      },

      invalidatesTags: (result, error, { slug }) => [
        { type: 'FitnessPlans', id: slug },
      ],
    }),
    updateMealPlan: builder.mutation<APIResponse<MealPlan>, Partial<MealPlan>>({
      query(data) {
        const { slug, ...body } = data;
        return {
          url: `meal-plans/${slug}`,
          method: 'PUT',
          body,
        };
      },

      invalidatesTags: (result, error, { slug }) => [
        { type: 'MealPlans', id: slug },
      ],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useAddArticleMutation,
  useGetArticlesQuery,
  useGetArticleQuery,
  useUpdateArticleMutation,
  useUpdateMealPlanMutation,
  useAddMealPlanMutation,
  useGetMealPlansQuery,
  useGetMealPlanQuery,
  useGetFitnessPlanQuery,
  useGetFitnessPlansQuery,
  useUpdateFitnessPlanMutation,
  useAddFitnessPlanMutation,
  useAddUserMutation,
  useGetUsersQuery,
  useGetUserQuery,
} = RejuvenateApi;
