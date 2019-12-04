import { from, empty, OperatorFunction } from 'rxjs';
import { switchMap, pairwise, filter, count, map } from 'rxjs/operators';
import { getDigits } from '../../helpers/get-digits';

export function filterNumbersWithTwoConsecutiveEqualDigits(): OperatorFunction<number, unknown> {
  return switchMap((pass: number) => {
    return from(getDigits(pass)).pipe(
      pairwise(),
      filter(([p1, p2]) => p1 === p2),
      count(),
      map((x) => x ? pass : empty()),
      filter(Boolean)
    )
  })
}
