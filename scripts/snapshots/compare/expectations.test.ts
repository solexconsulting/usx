import assert from 'node:assert/strict';
import test from 'node:test';
import { loadExpectations, parseExpectations } from './expectations.ts';

test('parses ignored attributes and section reasons', () => {
  const expectations = parseExpectations(
    JSON.stringify({
      pagination: { ignoreAttributes: ['href'], sections: { Sub: 'No Django render.' } },
    }),
    'test'
  );
  assert.deepEqual(expectations.get('pagination'), {
    ignoreAttributes: ['href'],
    sections: { Sub: 'No Django render.' },
  });
});

test('both keys are optional', () => {
  assert.deepEqual(parseExpectations('{"tag":{}}', 'test').get('tag'), {
    ignoreAttributes: [],
    sections: {},
  });
});

test('rejects malformed input with the location in the message', () => {
  assert.throws(() => parseExpectations('{', 'x.json'), /x\.json is not valid JSON/);
  assert.throws(() => parseExpectations('[]', 'x.json'), /keyed by component/);
  assert.throws(
    () => parseExpectations('{"tag":{"typo":1}}', 'x.json'),
    /x\.json: tag has unknown key\(s\): typo/
  );
  assert.throws(
    () => parseExpectations('{"tag":{"sections":{"A":""}}}', 'x.json'),
    /tag\.sections/
  );
  assert.throws(
    () => parseExpectations('{"tag":{"ignoreAttributes":[1]}}', 'x.json'),
    /tag\.ignoreAttributes/
  );
});

test('the committed expectations file is valid', () => {
  assert.doesNotThrow(() => loadExpectations());
});
