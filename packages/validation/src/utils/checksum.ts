/**
 * check IBAN checksum
 * @param {string} iban   the IBAN
 * @returns {boolean}
 */
const isValidChecksum = (iban: string): boolean => {
  const countryCode = iban.substring(0, 2);
  const checksum = iban.substring(2, 4);
  const ban = iban.substring(4) + countryCode + checksum; // move country code and checksum to end

  // convert alphanumeric chars to digits
  const digits = ban
    .split('')
    .map((c: string) => {
      if (c >= '0' && c <= '9') {
        return c;
      }
      if (c >= 'A' && c <= 'Z') {
        return `${c.charCodeAt(0) - 55}`;
      }

      throw new Error('Invalid character in IBAN');
    })
    .join('');

  const modulo97 = digits
    .split('')
    .reduce((accumulator, current) => (accumulator * 10 + parseInt(current, 10)) % 97, 0);

  return modulo97 === 1;
};

export default isValidChecksum;

