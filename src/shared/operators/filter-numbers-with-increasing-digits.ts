import { from } from 'rxjs';
import { switchMap, pairwise, map, every, filter } from 'rxjs/operators';
import { getDigits } from '../../helpers/get-digits';

export function filterNumbersWithIncreasingDigits() {
  return switchMap((pass: number) => {
    return from(getDigits(pass)).pipe(
      pairwise(),
      map(([p1, p2]) => p1 <= p2),
      every((areIncreasingDigits: boolean) => areIncreasingDigits),
      map((areIncreasingDigits: boolean) => areIncreasingDigits ? pass : null),
      filter(Boolean)
    )
  });
}
