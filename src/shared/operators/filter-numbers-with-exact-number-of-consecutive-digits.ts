import { from } from 'rxjs';
import { switchMap, scan, takeLast, filter, map, count } from 'rxjs/operators';
import { getDigits } from '../../helpers/get-digits';

export function filterNumbersWithExactNumberOfConsecutiveDigits(numberOfConsecutiveDigits: number) {
  return switchMap((pass: number) => {
    return from(getDigits(pass)).pipe(
      scan((acc: Array<Array<number>>, digit: number) => {
        if (acc[acc.length - 1] && acc[acc.length - 1][0] === digit) {
          acc[acc.length - 1].push(digit);
        } else {
          acc.push([digit]);
        }
        return acc;
      }, []),
      takeLast(1),
      switchMap((x: Array<Array<number>>) => from(x)),
      filter((digitsGroup: Array<number>) => digitsGroup.length === numberOfConsecutiveDigits),
      count(),
      map((x) => x ? pass : null),
      filter(Boolean)
    )
  });
}
