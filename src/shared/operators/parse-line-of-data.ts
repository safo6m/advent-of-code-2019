import { from, of } from 'rxjs';
import { map, concatAll, switchMap } from 'rxjs/operators';

export function parseLineOfData() {
  return switchMap((input: string) => {
    return of(input).pipe(
      map((s: string) => s.split(',')),
      map((s: Array<string>) => from(s)),
      concatAll()
    );
  });
}
