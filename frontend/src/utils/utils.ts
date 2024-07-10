export const validateLength = (value: string, maxLength: number): string => {
  return value.length <= maxLength ? value : value.substring(0, maxLength);
};
