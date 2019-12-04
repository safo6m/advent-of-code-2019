import { SecureContainer } from './challenge-4';

describe('Challenge 4 - part 1 - Secure Container', function() {
  let instance: SecureContainer;

  beforeEach(() => {
    instance = new SecureContainer();
  });

  it('should count number of secure passwords in the given range', function(done) {
    instance.countSecurePasswords(402328, 864247).subscribe((result) => {
      expect(result).toEqual(454);
      done();
    });
  });
});

describe('Challenge 4 - part 2 - Secure Container', function() {
  let instance: SecureContainer;

  beforeEach(() => {
    instance = new SecureContainer();
  });

  it('should count number of secure passwords without repetitions in the given range', function(done) {
    instance.countSecurePasswordsLargeRepetitions(402328, 864247).subscribe((result) => {
      expect(result).toEqual(288);
      done();
    });
  });
});
