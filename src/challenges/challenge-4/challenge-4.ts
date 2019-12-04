import { Observable, range } from 'rxjs';
import { filter, count } from 'rxjs/operators';
import { filterNumbersWithTwoConsecutiveEqualDigits } from '../../shared/operators/filter-numbers-with-two-consecutive-equal-digits';
import { filterNumbersWithIncreasingDigits } from '../../shared/operators/filter-numbers-with-increasing-digits';
import { filterNumbersWithExactNumberOfConsecutiveDigits } from '../../shared/operators/filter-numbers-with-exact-number-of-consecutive-digits';

export class SecureContainer {
  public countSecurePasswords(lowerBoundry: number, upperBoundry: number): Observable<any> {
    return range(lowerBoundry, upperBoundry - lowerBoundry + 1).pipe(
      filter((pass: number) => pass >= 100000 && pass < 1000000),
      filterNumbersWithTwoConsecutiveEqualDigits(),
      filterNumbersWithIncreasingDigits(),
      count()
    );
  }

  public countSecurePasswordsLargeRepetitions(lowerBoundry: number, upperBoundry: number): Observable<any> {
    return range(lowerBoundry, upperBoundry - lowerBoundry + 1).pipe(
      filter((pass: number) => pass >= 100000 && pass < 1000000),
      filterNumbersWithExactNumberOfConsecutiveDigits(2),
      filterNumbersWithIncreasingDigits(),
      count()
    );
  }
}
