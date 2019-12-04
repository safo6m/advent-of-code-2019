import { of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { parseLineOfData } from './parse-line-of-data';

export function parseLineOfNumbers() {
  return switchMap((input: string) => {
    return of(input).pipe(
      parseLineOfData(),
      map((s: string) => parseInt(s, 10))
    );
  });
}
