import { nanoid } from 'nanoid';
import slugify from 'slugify';
import { generate } from 'random-words';
import generateUniqueId from 'generate-unique-id';
export const env = process.env.NODE_ENV || 'development';
export const IS_DEV = env === 'development';

export const generateSlug = (text: string) =>
  slugify(text + '-' + nanoid(6), {
    lower: true,
    remove: /[*+~.()'"!:@]/g,
    strict: true,
  });
export const generateUsername = () =>
  'user' +
  generateUniqueId({
    length: 8,
    useLetters: false,
  });

export function objectToSearchParams(obj: Record<string, string>) {
  const params = new URLSearchParams();

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      params.append(key, obj[key]);
    }
  }

  return params;
}
