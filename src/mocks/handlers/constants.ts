export const computeTestingUrl = (url: string) => {
  // jest requires absolute path
  if (process.env.NODE_ENV === 'test') {
    return 'http://localhost' + url;
  }

  return url;
};
