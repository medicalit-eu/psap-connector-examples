/**
 * CPR Metronome module for TANR (Telefonicky Asistovaná Neodkladná Resuscitace).
 *
 * Generates a repeating cycle of compression and breath actions based on
 * a configurable compression:breath ratio.  When only a single rescuer is
 * present the breath phase is omitted entirely (compression-only CPR).
 *
 * Supported ratios:
 *   30:2  – adults (default)
 *   15:2  – children / two-rescuer pediatric CPR
 *
 * Usage:
 *   const metro = createMetronome({ compressions: 30, breaths: 2 });
 *   const metro = createMetronome({ compressions: 30, breaths: 2, singleRescuer: true });
 */

/** Standard CPR compression rate (beats per minute). */
const DEFAULT_BPM = 110;

/** Duration of a single breath phase in milliseconds. */
const BREATH_DURATION_MS = 1000;

/**
 * Build a full CPR cycle (array of action objects) for the given settings.
 *
 * @param {object}  options
 * @param {number}  options.compressions  – number of compressions per cycle (e.g. 30 or 15)
 * @param {number}  options.breaths       – number of breaths per cycle (e.g. 2)
 * @param {boolean} [options.singleRescuer=false] – when true breaths are omitted
 * @param {number}  [options.bpm=110]     – compression rate in beats per minute
 * @returns {{ actions: Array<{type: string, duration: number, index: number}>, cycleDuration: number }}
 */
export function buildCycle({ compressions, breaths, singleRescuer = false, bpm = DEFAULT_BPM } = {}) {
  if (!Number.isInteger(compressions) || compressions < 1) {
    throw new Error(`compressions must be a positive integer, got ${compressions}`);
  }
  if (!Number.isInteger(breaths) || breaths < 0) {
    throw new Error(`breaths must be a non-negative integer, got ${breaths}`);
  }

  const compressionInterval = Math.round(60_000 / bpm);
  const actions = [];
  let elapsed = 0;

  for (let i = 0; i < compressions; i++) {
    actions.push({ type: 'compression', duration: compressionInterval, index: i + 1 });
    elapsed += compressionInterval;
  }

  const effectiveBreaths = singleRescuer ? 0 : breaths;

  for (let i = 0; i < effectiveBreaths; i++) {
    actions.push({ type: 'breath', duration: BREATH_DURATION_MS, index: i + 1 });
    elapsed += BREATH_DURATION_MS;
  }

  return { actions, cycleDuration: elapsed };
}

/**
 * Create a metronome configuration object.
 *
 * @param {object}  options
 * @param {number}  options.compressions  – compressions per cycle
 * @param {number}  options.breaths       – breaths per cycle
 * @param {boolean} [options.singleRescuer=false]
 * @param {number}  [options.bpm=110]
 * @returns {{ compressions: number, breaths: number, singleRescuer: boolean, bpm: number, cycle: ReturnType<typeof buildCycle> }}
 */
export function createMetronome({ compressions = 30, breaths = 2, singleRescuer = false, bpm = DEFAULT_BPM } = {}) {
  const cycle = buildCycle({ compressions, breaths, singleRescuer, bpm });

  return {
    compressions,
    breaths,
    singleRescuer,
    bpm,
    effectiveBreaths: singleRescuer ? 0 : breaths,
    cycle,
    /** Human-readable label, e.g. "30:2" or "30:0 (single rescuer)". */
    get label() {
      if (singleRescuer) {
        return `${compressions}:0 (single rescuer)`;
      }
      return `${compressions}:${breaths}`;
    }
  };
}
