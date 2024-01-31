export const supportedCategories = [
  'books',
  'podcasts',
  'builders',
  'key_dates',
] as const;
// This a change (key_dates)

export type ResourceCategory = (typeof supportedCategories)[number];

type AssertSupportedCategory = (
  path: string,
) => asserts path is ResourceCategory;

export const assertSupportedCategoryPath: AssertSupportedCategory = (path) => {
  if (!supportedCategories.includes(path as ResourceCategory)) {
    throw new Error(`Invalid resource category path: ${path}`);
  }
};
