import { Observable, of, empty, from } from 'rxjs';
import { map, expand, flatMap, bufferCount, toArray, take, takeLast, skip, skipLast, takeWhile } from 'rxjs/operators';
import { Operation } from './operations.enum';

type Position = number;
type Opcode = [Operation, Position, Position, Position];

export class ProgramAlarm {
  public runSequence(input$: Observable<any>, noun?:number, verb?: number): Observable<number> {
    return input$.pipe(
      toArray(),
      map((wholeSequence: Array<number>) => {
        return this.restoreProgram(wholeSequence, noun, verb);
      }),
      expand((wholeSequence: Array<number>, index: number) => {
        return wholeSequence.length ? this.runProgramIteration(wholeSequence, index) : empty();
      }),
      skipLast(1),
      takeLast(1),
      map((finalSequence: Array<number>) => finalSequence[0])
    );
  }

  public findVerbAndNoun(input$: Observable<any>, finalResult: number): Observable<any> {
    const pairs: Array<[number, number]> = [];

    // TODO: find Rx way to do that
    Array.from(Array(100).keys()).forEach((i: number) => {
      Array.from(Array(100).keys()).forEach((j: number) => {
        pairs.push([i, j]);
      });
    });

    return from(pairs).pipe(
      flatMap(([noun, verb]) => {
        return of(true).pipe(
          flatMap(this.runSequence.bind(this, input$, noun, verb)),
          map((currentResult: number) => {
            return {
              noun,
              verb,
              finalResult: currentResult
            };
          })
        );
      }),
      takeWhile((currentResult: any) => currentResult.finalResult !== finalResult, true),
      takeLast(1)
    )
  }

  private runProgramIteration(wholeSequence: Array<number>, index: number): Observable<Array<number>> {
    return from(wholeSequence).pipe(
      bufferCount(4),
      skip(index),
      take(1),
      takeWhile((opcode: Opcode) => {
        const operation: Operation = opcode[0];
        return operation !== Operation.HALT;
      }),
      map(([operation, positionA, positionB, positionOutput]) => {
        const elementA: number = wholeSequence[positionA];
        const elementB: number = wholeSequence[positionB];

        wholeSequence[positionOutput] = this.calculate(elementA, elementB, operation);

        return wholeSequence;
      })
    );
  }

  private calculate(elementA: number, elementB: number, operation: Operation): number {
    let result: number;

    switch(operation) {
      case Operation.ADDITION:
        result = elementA + elementB;
        break;
      case Operation.MULTIPLICATION:
        result = elementA * elementB;
        break;
      default:
        throw Error(`Unknown operation: ${operation}`);
    }

    return result;
  }

  private restoreProgram(wholeSequence: Array<number>, noun?: number, verb?: number): Array<number> {
    const sequence: Array<number> = [].concat(wholeSequence);
    sequence[1] = noun || sequence[1];
    sequence[2] = verb || sequence[2];
    return sequence;
  }
}
