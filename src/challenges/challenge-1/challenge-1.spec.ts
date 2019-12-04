import { of } from 'rxjs';
import { readFileObservable } from '../../helpers/file-reader';
import { SpacecraftModule } from './challenge-1';

describe('Challenge 1 - Simple fuel calculation', function() {
  let instance: SpacecraftModule;

  beforeEach(() => {
    instance = new SpacecraftModule();
  });

  it('should caluculate simple single input without rounding', function(done) {
    instance.runSequence(of(12)).subscribe((result) => {
      expect(result).toEqual(2);
      done();
    });
  });

  it('should caluculate simple single input without rounding', function(done) {
    instance.runSequence(of(14)).subscribe((result) => {
      expect(result).toEqual(2);
      done();
    });
  });


  it('should caluculate fuel for mass 100756', function(done) {
    instance.runSequence(of(100756)).subscribe((result) => {
      expect(result).toEqual(33583);
      done();
    });
  });

  it('should caluculate fuel for mass 1969', function(done) {
    instance.runSequence(of(1969)).subscribe((result) => {
      expect(result).toEqual(654);
      done();
    });
  });


  it('should caluculate multiple inputs at once', function(done) {
    instance.runSequence(of(14, 12)).subscribe((result) => {
      expect(result).toEqual(4);
      done();
    });
  });

  it('should pass input 1', function(done) {
    const sourceFile1 = readFileObservable('./src/challenges/challenge-1/test-data/input-1.txt');

    instance.runSequence(sourceFile1).subscribe((result) => {
      expect(result).toEqual(3376997);
      done();
    });
  });
});

describe('Challenge 1 - Complex fuel calculation', function() {
  let instance: SpacecraftModule;

  beforeEach(() => {
    instance = new SpacecraftModule();
  });

  it('should caluculate complex fuel based on mass 14', function(done) {
    instance.runComplexSequence(of(14)).subscribe((result) => {
      expect(result).toEqual(2);
      done();
    });
  });

  it('should caluculate complex fuel based on mass 1969', function(done) {
    instance.runComplexSequence(of(1969)).subscribe((result) => {
      expect(result).toEqual(966);
      done();
    });
  });

  it('should caluculate complex fuel based on mass 100756', function(done) {
    instance.runComplexSequence(of(100756)).subscribe((result) => {
      expect(result).toEqual(50346);
      done();
    });
  });

  it('should pass input 1', function(done) {
    const sourceFile1 = readFileObservable('./src/challenges/challenge-1/test-data/input-1.txt');

    instance.runComplexSequence(sourceFile1).subscribe((result) => {
      expect(result).toEqual(5062623);
      done();
    });
  });
});
