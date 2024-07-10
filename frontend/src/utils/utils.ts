export const validateLength = (value: string, maxLength: number): string => {
  return value.length <= maxLength ? value : value.substring(0, maxLength);
};

export const formatarData = (date: Date | string): string => {
  const parsedDate = new Date(date);
  return parsedDate.toLocaleDateString();
};
