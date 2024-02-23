import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  APIResponse,
  Article,
  MealPlan,
  NewMealPlan,
  FitnessPlan,
  NewArticle,
  NewFitnessPlan,
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
    // getUsers: builder.query<Partial<APIResponse<User[]>>, void>({
    //   query: () => {
    //     return {
    //       url: `users/`,
    //     };
    //   },
    //   providesTags: (result) =>
    //     // is result available?
    //     result?.data
    //       ? // successful query
    //         [
    //           ...result?.data.map(({ id }) => ({
    //             type: 'Users' as const,
    //             id: id,
    //           })),
    //           { type: 'Users', id: 'LIST' },
    //         ]
    //       : [{ type: 'Users', id: 'LIST' }],
    // }),
    getArticle: builder.query<Partial<APIResponse<Article>>, string>({
      query: (slug) => `articles/${slug}`,
      providesTags: (result, error, slug) => {
        return [{ type: 'Articles' as const, id: slug }];
      },
    }),
    getMealPlan: builder.query<Partial<APIResponse<MealPlan>>, string>({
      query: (slug) => `meal-plans/${slug}`,
      providesTags: (result, error, slug) => {
        return [{ type: 'MealPlans' as const, id: slug }];
      },
    }),
    getFitnessPlan: builder.query<Partial<APIResponse<FitnessPlan>>, string>({
      query: (slug) => `fitness-plans/${slug}`,
      providesTags: (result, error, slug) => {
        return [{ type: 'FitnessPlans' as const, id: slug }];
      },
    }),
    // getUser: builder.query<Partial<APIResponse<User>>, string>({
    //   query: (username) => `users/${username}`,
    //   providesTags: (result, error, username) => {
    //     return [{ type: 'Users' as const, id: username }];
    //   },
    // }),
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
} = RejuvenateApi;
