export const replaceAll = (string: string, search: string, replace: string) => {
  return string.split(search).join(replace);
};

export function toTitleCase(str: string): string {
  // Replace underscores with spaces
  str = str.replace(/_/g, " ");

  // Split the string into words
  const words = str.split(" ");

  // Capitalize the first letter of each word
  const titleCasedWords = words.map((word) => {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  });

  // Join the title cased words back into a single string
  const titleCasedString = titleCasedWords.join(" ");

  return titleCasedString;
}
