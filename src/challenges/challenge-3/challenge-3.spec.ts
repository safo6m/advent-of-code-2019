import { of } from 'rxjs';
import { readFileObservable } from '../../helpers/file-reader';
import { CrossedWires } from './challenge-3';

describe('Challenge 3 - part 1 - Crossed Wires', function() {
  let instance: CrossedWires;

  beforeEach(() => {
    instance = new CrossedWires();
  });

  it('should calculate manhattan distance of the closes intersection', function(done) {
    const input1: string = 'R75,D30,R83,U83,L12,D49,R71,U7,L72';
    const input2: string = 'U62,R66,U55,R34,D71,R55,D58,R83';

    instance.calculateManhattanDistanceOfTheClosesIntersection(of(input1, input2)).subscribe((result) => {
      expect(result).toEqual(159);
      done();
    });
  });

  it('should calculate manhattan distance of the closes intersection 2', function(done) {
    const input1: string = 'R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51';
    const input2: string = 'U98,R91,D20,R16,D67,R40,U7,R15,U6,R7';

    instance.calculateManhattanDistanceOfTheClosesIntersection(of(input1, input2)).subscribe((result) => {
      expect(result).toEqual(135);
      done();
    });
  });

  it('should calculate manhattan distance of the closes intersection based on large input', function(done) {
    const sourceFile1 = readFileObservable('./src/challenges/challenge-3/test-data/input-1.txt');

    instance.calculateManhattanDistanceOfTheClosesIntersection(sourceFile1).subscribe((result) => {
      expect(result).toEqual(1211);
      done();
    });
  });
});

describe('Challenge 3 - part 2 - Crossed Wires', function() {
  let instance: CrossedWires;

  beforeEach(() => {
    instance = new CrossedWires();
  });

  it('should count number of the steps to the closest intersection', function(done) {
    const input1: string = 'R75,D30,R83,U83,L12,D49,R71,U7,L72';
    const input2: string = 'U62,R66,U55,R34,D71,R55,D58,R83';

    instance.calculateTheFewestStepToIntersection(of(input1, input2)).subscribe((result) => {
      expect(result).toEqual(610);
      done();
    });
  });

  it('should count number of the steps to the closest intersection 2', function(done) {
    const input1: string = 'R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51';
    const input2: string = 'U98,R91,D20,R16,D67,R40,U7,R15,U6,R7';

    instance.calculateTheFewestStepToIntersection(of(input1, input2)).subscribe((result) => {
      expect(result).toEqual(410);
      done();
    });
  });

  it('should calculate manhattan distance of the closes intersection based on large input', function(done) {
    const sourceFile1 = readFileObservable('./src/challenges/challenge-3/test-data/input-1.txt');

    instance.calculateTheFewestStepToIntersection(sourceFile1).subscribe((result) => {
      expect(result).toEqual(101386);
      done();
    });
  });
});
