import { nanoid } from 'nanoid';
import slugify from 'slugify';
import { generate } from 'random-words';
export const env = process.env.NODE_ENV || 'development';
export const IS_DEV = env === 'development';

export const generateSlug = (text: string) =>
  slugify(text + nanoid(6), {
    lower: true,
    remove: /[*+~.()'"!:@]/g,
    strict: true,
  });
export const generateUsername = () =>
  generate({ exactly: 1, wordsPerString: 2, separator: '-', maxLength: 5 })[0];
