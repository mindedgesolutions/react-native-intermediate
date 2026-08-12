export const validateNumber = (value: string | number | undefined | null) => {
  if (value === null || value === undefined || value === '') return true;
  const str = String(value);
  const pattern = /^[0-9]+$/;
  return pattern.test(str);
};
