import { Observable, of, empty } from 'rxjs';
import { map, reduce, expand } from 'rxjs/operators';

export class SpacecraftModule {
  public runSequence(input$: Observable<any>): Observable<number> {
    return input$.pipe(
      map(this.getRequiredFuel),
      reduce(this.sumMasses)
    );
  }

  public runComplexSequence(input$: Observable<any>): Observable<number> {
    return input$.pipe(
      map(this.getRequiredFuel),
      expand((fuel) => {
        return fuel && fuel > 0 ? of(this.getRequiredFuel(fuel)) : empty();
      }),
      map((mass) => mass > 0 ? mass : 0),
      reduce(this.sumMasses)
    );
  }

  public getRequiredFuel(moduleMass: number): number {
    return Math.floor(moduleMass / 3) - 2;
  }

  private sumMasses(acc: number, fuel: number): number {
    return acc + fuel;
  }
}
