export function getDigits(value: number): Array<number> {
  const digitsString: Array<string> = value.toString().split('');
  return digitsString.map(Number);
}