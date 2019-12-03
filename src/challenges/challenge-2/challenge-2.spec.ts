import { of, from } from 'rxjs';
import { map, concatAll } from 'rxjs/operators';
import { readFileObservable } from '../../helpers/file-reader';
import { ProgramAlarm } from './challenge-2';

describe('Challenge 2 - 1202 Program Alarm', function() {
  let instance: ProgramAlarm;

  beforeEach(() => {
    instance = new ProgramAlarm();
  });

  it('should calculate the correct positions with a simple input', function(done) {
    instance.runSequence(of(1,0,0,0,99)).subscribe((result) => {
      expect(result).toEqual(2);
      done();
    });
  });

  it('should calculate the correct positions with a simple input with different positions', function(done) {
    instance.runSequence(of(2,3,0,3,99)).subscribe((result) => {
      expect(result).toEqual(2);
      done();
    });
  });

  it('should calculate the correct positions and store the final value on fifth position', function(done) {
    instance.runSequence(of(2,4,4,5,99,0)).subscribe((result) => {
      expect(result).toEqual(2);
      done();
    });
  });

  it('should calculate the correct positions with multiple halts', function(done) {
    instance.runSequence(of(1,1,1,4,99,5,6,0,99)).subscribe((result) => {
      expect(result).toEqual(30);
      done();
    });
  });

  it('should pass input 1', function(done) {
    const sourceFile1 = readFileObservable('./src/challenges/challenge-2/test-data/input-1.txt').pipe(
      map((s) => s.split(',')),
      map((s: Array<string>) => from(s)),
      concatAll(),
      map((s: string) => parseInt(s, 10))
    );

    instance.runSequence(sourceFile1, 12, 2).subscribe((result) => {
      expect(result).toEqual(6730673);
      done();
    });
  });

  it('should pass an input from challenge 2', function(done) {
    const sourceFile1 = readFileObservable('./src/challenges/challenge-2/test-data/input-1.txt').pipe(
      map((s) => s.split(',')),
      map((s: Array<string>) => from(s)),
      concatAll(),
      map((s: string) => parseInt(s, 10))
    );

    instance.runSequence(sourceFile1, 37, 49).subscribe((result) => {
      expect(result).toEqual(19690720);
      done();
    });
  });
});

describe('Challenge 2 - part 2- 1202 Program Alarm', function() {
  let instance: ProgramAlarm;

  beforeEach(() => {
    instance = new ProgramAlarm();
  });

  it('should find the correct noun and verb', function(done) {
    const sourceFile1 = readFileObservable('./src/challenges/challenge-2/test-data/input-1.txt').pipe(
      map((s) => s.split(',')),
      map((s: Array<string>) => from(s)),
      concatAll(),
      map((s: string) => parseInt(s, 10))
    );

    instance.findVerbAndNoun(sourceFile1, 19690720).subscribe((result) => {
      const calculatedResult: number = 100 * result.noun + result.verb;
      expect(calculatedResult).toEqual(3749);
      done();
    });
  });
});
