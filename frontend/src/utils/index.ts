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
export function selectObjectKeys<T extends object>(obj: T) {
  const resultArray = [];

  return (
    obj &&
    Object.keys(obj).map((key) => {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        const spacedKey = key.replace(/([a-z])([A-Z])/g, '$1 $2');
        const formattedKey =
          spacedKey.charAt(0).toUpperCase() + spacedKey.slice(1);

        const keyString = `${formattedKey}`;

        return keyString;
      }
    })
  );

  // return resultArray;
}
export function objectToSearchParams(obj: Record<string, string>) {
  const params = new URLSearchParams();

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      params.append(key, obj[key]);
    }
  }

  return params;
}
export function removeKeyFromObject<T extends object>(
  arr: T[],
  keysToRemove: (keyof T)[] = []
) {
  return arr?.map((obj) => {
    const newObj: Record<string, any> = {};

    obj &&
      Object.keys(obj).forEach((key) => {
        if (!keysToRemove.includes(key as keyof T)) {
          newObj[key] = obj[key as keyof T];
        }
      });
    // const omits = keysToRemove.join('|') as const;
    return newObj as T;
  });
}
export function genID() {
  return nanoid(8);
}
