import { Observable, from } from 'rxjs';
import { map, tap, takeLast, filter, switchMap, min } from 'rxjs/operators';
import { parseLineOfData } from '../../shared/operators/parse-line-of-data';

enum Direction {
  D = 'D',
  R = 'R',
  L = 'L',
  U = 'U'
}

class Point {
  constructor(public x: number, public y: number) {}

  toString() {
    return `${this.x}-${this.y}`;
  }
}

class Line {
  public traveledDistance: number = 0;

  public makeStep(): void {
    this.traveledDistance ++;
  }
}

type CoordinatePoint = {
  point: Point,
  crossingLines: Set<Line>,
  numberOfStepUntilHere: number,
}

class CoordinateSystem {
  public points: { [key: string]: CoordinatePoint } = {};
  private _currentPosition: Point = new Point(0, 0);

  get currentPosition(): Point {
    return this._currentPosition;
  }

  set currentPosition(point: Point) {
    this._currentPosition = point;
  }

  public set lineCorssesCurrentPosition(line: Line) {
    const coordinateKey: string = `${this.currentPosition}`;

    if (!this.points[coordinateKey]) {
      this.initCoordinatePoint(this.currentPosition);
    }

    if (!this.points[coordinateKey].crossingLines.has(line)) {
      this.points[coordinateKey].numberOfStepUntilHere += line.traveledDistance;
    }

    this.points[coordinateKey].crossingLines.add(line);
  }

  public takeStep(direction: Direction): void {
    switch (direction) {
      case Direction.D:
        this._currentPosition.y --;
        break;
      case Direction.U:
        this._currentPosition.y ++;
        break;
      case Direction.R:
        this._currentPosition.x ++;
        break;
      case Direction.L:
        this._currentPosition.x --;
        break;
      default:
        throw new Error(`Unknown step direction ${direction}`);
    }
  }

  private initCoordinatePoint(point: Point): void {
    this.points[`${this.currentPosition}`] = { point: new Point(point.x, point.y), crossingLines: new Set(), numberOfStepUntilHere: 0 };
  }
}

export class CrossedWires {
  public calculateManhattanDistanceOfTheClosesIntersection(input$: Observable<any>): Observable<any> {
    return this.generateCrossingPoints(input$).pipe(
      map((coordinatePoint: CoordinatePoint) => this.calculateManhattanDistance(coordinatePoint.point)),
      min()
    )
  }

  public calculateTheFewestStepToIntersection(input$: Observable<any>): Observable<any> {
    return this.generateCrossingPoints(input$).pipe(
      map((coordinatePoint: CoordinatePoint) => coordinatePoint.numberOfStepUntilHere),
      min()
    );
  }

  private generateCrossingPoints(input$: Observable<any>): Observable<any> {
    let coordinateSystem: CoordinateSystem = new CoordinateSystem();
    let currentLine: Line;

    return input$.pipe(
      tap(() => {
        currentLine = new Line();
        coordinateSystem.currentPosition = new Point(0, 0);
      }),
      parseLineOfData(),
      map((operation: string) => {
        const direction: Direction = operation[0] as Direction;
        const linePartLength: number = parseInt(operation.slice(1), 10);

        return {
          direction,
          linePartLength
        };
      }),
      map(({ direction, linePartLength }) => {
        while(linePartLength--) {
          coordinateSystem.lineCorssesCurrentPosition = currentLine;
          coordinateSystem.takeStep(direction);
          currentLine.makeStep();
        }

        return coordinateSystem;
      }),
      takeLast(1),
      switchMap((coordinateSystem: CoordinateSystem) => from(Object.values(coordinateSystem.points))),
      filter((coordinatePoint: CoordinatePoint) => coordinatePoint.crossingLines.size > 1),
      filter((coordinatePoint: CoordinatePoint) => !(coordinatePoint.point.x === 0 && coordinatePoint.point.y === 0)), // remove (0,0) coordinate
    );
  }

  private calculateManhattanDistance(p1: Point, p2: Point = new Point(0, 0)): number {
    return Math.abs(p1.x - p2.x) + Math.abs(p1.y - p2.y);
  }
}
