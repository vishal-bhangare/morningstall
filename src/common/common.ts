export const replaceAll = (string: string, search: string, replace: string) => {
  return string.split(search).join(replace);
};
