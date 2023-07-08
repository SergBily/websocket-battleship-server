export const jsonConverter = <T>(data: string | T) => {
  if (typeof data === 'string') {
    return JSON.parse(data);
  }
  return JSON.stringify(data);
};
