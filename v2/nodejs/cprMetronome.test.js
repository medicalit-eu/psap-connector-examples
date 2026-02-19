import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { buildCycle, createMetronome } from './cprMetronome.js';

describe('buildCycle', () => {
  it('produces 30 compressions and 2 breaths for 30:2 ratio', () => {
    const { actions } = buildCycle({ compressions: 30, breaths: 2 });
    const compressions = actions.filter(a => a.type === 'compression');
    const breaths = actions.filter(a => a.type === 'breath');
    assert.equal(compressions.length, 30);
    assert.equal(breaths.length, 2);
  });

  it('produces 15 compressions and 2 breaths for 15:2 ratio', () => {
    const { actions } = buildCycle({ compressions: 15, breaths: 2 });
    const compressions = actions.filter(a => a.type === 'compression');
    const breaths = actions.filter(a => a.type === 'breath');
    assert.equal(compressions.length, 15);
    assert.equal(breaths.length, 2);
  });

  it('omits breaths when singleRescuer is true', () => {
    const { actions } = buildCycle({ compressions: 30, breaths: 2, singleRescuer: true });
    const breaths = actions.filter(a => a.type === 'breath');
    assert.equal(breaths.length, 0);
  });

  it('still has compressions when singleRescuer is true', () => {
    const { actions } = buildCycle({ compressions: 30, breaths: 2, singleRescuer: true });
    const compressions = actions.filter(a => a.type === 'compression');
    assert.equal(compressions.length, 30);
  });

  it('throws when compressions is not a positive integer', () => {
    assert.throws(() => buildCycle({ compressions: 0, breaths: 2 }), /positive integer/);
    assert.throws(() => buildCycle({ compressions: -1, breaths: 2 }), /positive integer/);
    assert.throws(() => buildCycle({ compressions: 1.5, breaths: 2 }), /positive integer/);
  });

  it('throws when breaths is negative', () => {
    assert.throws(() => buildCycle({ compressions: 30, breaths: -1 }), /non-negative integer/);
  });

  it('calculates correct cycle duration', () => {
    const bpm = 100;
    const interval = 60_000 / bpm; // 600ms
    const { cycleDuration } = buildCycle({ compressions: 30, breaths: 2, bpm });
    const expected = 30 * interval + 2 * 1000;
    assert.equal(cycleDuration, expected);
  });

  it('calculates cycle duration without breaths for single rescuer', () => {
    const bpm = 100;
    const interval = 60_000 / bpm;
    const { cycleDuration } = buildCycle({ compressions: 30, breaths: 2, bpm, singleRescuer: true });
    const expected = 30 * interval;
    assert.equal(cycleDuration, expected);
  });

  it('indexes compressions starting at 1', () => {
    const { actions } = buildCycle({ compressions: 3, breaths: 1 });
    const compressions = actions.filter(a => a.type === 'compression');
    assert.deepEqual(compressions.map(a => a.index), [1, 2, 3]);
  });

  it('indexes breaths starting at 1', () => {
    const { actions } = buildCycle({ compressions: 2, breaths: 2 });
    const breaths = actions.filter(a => a.type === 'breath');
    assert.deepEqual(breaths.map(a => a.index), [1, 2]);
  });
});

describe('createMetronome', () => {
  it('returns correct label for 30:2', () => {
    const m = createMetronome({ compressions: 30, breaths: 2 });
    assert.equal(m.label, '30:2');
  });

  it('returns correct label for 15:2', () => {
    const m = createMetronome({ compressions: 15, breaths: 2 });
    assert.equal(m.label, '15:2');
  });

  it('returns single rescuer label when singleRescuer is true', () => {
    const m = createMetronome({ compressions: 30, breaths: 2, singleRescuer: true });
    assert.equal(m.label, '30:0 (single rescuer)');
  });

  it('sets effectiveBreaths to 0 for single rescuer', () => {
    const m = createMetronome({ compressions: 30, breaths: 2, singleRescuer: true });
    assert.equal(m.effectiveBreaths, 0);
  });

  it('sets effectiveBreaths to breaths value for multi-rescuer', () => {
    const m = createMetronome({ compressions: 30, breaths: 2 });
    assert.equal(m.effectiveBreaths, 2);
  });

  it('defaults to 30:2 when called without arguments', () => {
    const m = createMetronome();
    assert.equal(m.compressions, 30);
    assert.equal(m.breaths, 2);
    assert.equal(m.singleRescuer, false);
  });

  it('contains a valid cycle', () => {
    const m = createMetronome({ compressions: 15, breaths: 2 });
    assert.ok(m.cycle);
    assert.ok(Array.isArray(m.cycle.actions));
    assert.equal(m.cycle.actions.filter(a => a.type === 'compression').length, 15);
    assert.equal(m.cycle.actions.filter(a => a.type === 'breath').length, 2);
  });
});
