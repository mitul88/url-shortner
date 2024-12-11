export const urlShortner = (url: string): string => {
  let hashed = btoa(url);
  return hashed.substring(0, 7);
};
