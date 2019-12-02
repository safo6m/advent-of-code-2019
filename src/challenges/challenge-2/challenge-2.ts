import { Observable, of, empty, merge, combineLatest, pipe, Subject, from } from 'rxjs';
import { map, reduce, expand, flatMap, mergeAll, scan, buffer, bufferCount, toArray, concatAll, tap, take, takeLast, skip, skipLast, takeUntil, takeWhile } from 'rxjs/operators';

const operations = {
  halt: 99,
  addition: 1,
  multiplication: 2
}

type Operation = number;
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

  private runProgramIteration(wholeSequence: Array<number>, index: number): Observable<Array<number>> {
    return from(wholeSequence).pipe(
      bufferCount(4),
      skip(index),
      take(1),
      takeWhile((opcode: Opcode) => {
        const operation: Operation = opcode[0];
        return operation !== operations.halt;
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
    if (operation === operations.addition) {
      return elementA + elementB;
    } else if (operation === operations.multiplication) {
      return elementA * elementB;
    }

    throw Error('Unknown operation');
  }

  private restoreProgram(wholeSequence: Array<number>, noun?: number, verb?: number): Array<number> {
    wholeSequence[1] = noun || wholeSequence[1];
    wholeSequence[2] = verb || wholeSequence[2];
    return wholeSequence;
  }
}
