export const phoneNumberFormatter = (phoneNumber: string): string => {
  if (phoneNumber[0] === '+') {
    return phoneNumber.slice(1).split(' ').join('');
  }
  return phoneNumber;
};
