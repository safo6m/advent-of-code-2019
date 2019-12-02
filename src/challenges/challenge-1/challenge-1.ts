import { Observable, of, concat, empty } from 'rxjs';
import { tap, map, mergeAll, flatMap, buffer, concatMap, exhaustMap, concatAll, scan, toArray, reduce, expand, take } from 'rxjs/operators';

export class SpacecraftModule {
  public runSequence(input$: Observable<any>): Observable<number> {
    return input$.pipe(
      map(this.getRequiredFuel),
      reduce((acc, fuel) => {
        return acc + fuel;
      })
    );
  }

  public runComplexSequence(input$: Observable<any>): Observable<number> {
    return input$.pipe(
      map(this.getRequiredFuel),
      expand((fuel) => {
        return fuel && fuel > 0 ? of(this.getRequiredFuel(fuel)) : empty();
      }),
      map((mass) => mass > 0 ? mass : 0),
      reduce((acc, fuel) => {
        return acc + fuel;
      })
    );
  }

  public getRequiredFuel(moduleMass: number): number {
    return Math.floor(moduleMass / 3) - 2;
  }
}
