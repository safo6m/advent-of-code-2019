import * as fs from 'fs';
import { Subject, Observable } from 'rxjs';

export function readFileObservable(filename: string): Observable<string> {
  const source: Subject<string> = new Subject();

  const fileread = fs.createReadStream(filename, 'utf8');
  let buffer = '';

  fileread.on('data', function(data) {
    buffer += data;
    const parts = buffer.split('\n');
    buffer = parts.pop();

    parts.forEach(function(x) {
      source.next(x);
    });
  });

  fileread.on('close', function() {
      source.complete();
  });

  return source;
}
