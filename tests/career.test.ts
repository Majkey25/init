import assert from 'node:assert/strict';
import test from 'node:test';
import { careerRange, getExperience } from '../src/data/career.ts';

test('career bars include the end month and bound ongoing periods to the chart', () => {
  const school = careerRange('2021-09', '2025-05');
  const stc = careerRange('2023-01', '2025-06');
  const ongoing = careerRange('2025-09', null);
  assert.ok(stc.start + stc.duration > school.start + school.duration);
  assert.equal(stc.duration, (30 / 72) * 100);
  assert.equal(ongoing.start + ongoing.duration, 100);
  assert.deepEqual(careerRange('2020-01', '2030-01'), { start: 0, duration: 100 });
});

test('both languages use the same completed and ongoing career periods', () => {
  const periods = (lang: 'en' | 'cs') =>
    getExperience(lang).map(({ start, end }) => ({ start, end }));
  assert.deepEqual(periods('en'), periods('cs'));
  assert.deepEqual(periods('en')[1], { start: '2023-01', end: '2025-06' });
  assert.equal(periods('en')[3]?.end, null);
});
