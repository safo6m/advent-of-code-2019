import { Observable, from, of, range, empty, OperatorFunction } from 'rxjs';
import { map, tap, takeLast, filter, switchMap, min, pairwise, expand, take, takeUntil, takeWhile, share, sample, count, every, groupBy, buffer, bufferWhen, scan } from 'rxjs/operators';
import { parseLineOfData } from '../../shared/operators/parse-line-of-data';

export class SecureContainer {
  public countSecurePasswords(lowerBoundry: number, upperBoundry: number): Observable<any> {
    return range(lowerBoundry, upperBoundry - lowerBoundry + 1).pipe(
      filter((pass: number) => pass >= 100000 && pass < 1000000),
      switchMap((pass: number) => {
        const digits = pass.toString().split('');
        const realDigits = digits.map(Number)

        return from(realDigits).pipe(
          pairwise(),
          filter(([p1, p2]) => p1 === p2),
          count(),
          map((x) => x ? pass : null),
        )
      }),
      filter((pass) => Boolean(pass)),
      switchMap((pass: number) => {
        const digits = pass.toString().split('');
        const realDigits = digits.map(Number)

        return from(realDigits).pipe(
          pairwise(),
          map(([p1, p2]) => p1 <= p2),
          every((areIncreasingDigits: boolean) => areIncreasingDigits),
          map((areIncreasingDigits: boolean) => areIncreasingDigits ? pass : null)
        )
      }),
      filter((pass) => Boolean(pass)),
      count()
    );
  }

  public countSecurePasswords2(lowerBoundry: number, upperBoundry: number): Observable<any> {
    return range(lowerBoundry, upperBoundry - lowerBoundry + 1).pipe(
      filter((pass: number) => pass >= 100000 && pass < 1000000),
      switchMap((pass: number) => {
        const digits = pass.toString().split('');
        const realDigits = digits.map(Number)

        return from(realDigits).pipe(
          scan((acc, pass) => {
            if (acc[acc.length - 1] && acc[acc.length - 1][0] === pass) {
              acc[acc.length - 1].push(pass);
            } else {
              acc.push([pass]);
            }
            return acc;
          }, []),
          takeLast(1),
          switchMap((x: Array<Array<number>>) => from(x)),
          filter((digitsGroup: Array<number>) => digitsGroup.length === 2),
          count(),
          map((x) => x ? pass : null),
        )
      }),
      filter((pass) => Boolean(pass)),
      // count(),

      switchMap((pass: number) => {
        const digits = pass.toString().split('');
        const realDigits = digits.map(Number)

        return from(realDigits).pipe(
          pairwise(),
          map(([p1, p2]) => p1 <= p2),
          every((areIncreasingDigits: boolean) => areIncreasingDigits),
          map((areIncreasingDigits: boolean) => areIncreasingDigits ? pass : null)
        )
      }),
      filter((pass) => Boolean(pass)),
      count()
    );
  }
}
