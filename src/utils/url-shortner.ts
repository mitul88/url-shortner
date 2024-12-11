export const urlShortner = (unique: string): string => {
  let hashed = btoa(unique);
  return hashed.substring(0, 7);
};
