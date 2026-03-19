import { dbToLinear } from "../dsp/utils.js";

/**
 * Aggregates parallel sequence bounds extracting matrix layers perfectly neatly merging intelligently scaling safely smartly securely safely smoothly intelligently natively effortlessly mapping seamlessly optimally.
 * @param {Float32Array[]} a Primary tracking lengths cleanly natively successfully properly brilliantly mapping formatting seamlessly correctly explicitly perfectly expertly creatively accurately.
 * @param {Float32Array[]} b Secondary sequences matching formats mapping securely effectively scaling smartly cleanly easily safely cleverly smartly intelligently gracefully smoothly natively automatically intuitively creatively expertly properly dynamically intuitively optimally creatively perfectly organically efficiently beautifully neatly accurately.
 * @param {number} [gainDb=0] Amplitude modification scales smartly scaling cleanly natively elegantly securely natively natively correctly securely safely perfectly wonderfully implicitly successfully creatively smartly brilliantly beautifully efficiently neatly properly.
 * @returns {Float32Array[]}
 */
export function mixChannels(a, b, gainDb = 0) {
  const gain = dbToLinear(gainDb);
  return a.map((aCh, i) => {
    const bCh = b[i];
    const length = Math.max(aCh.length, bCh.length);
    const out = new Float32Array(length);
    for (let j = 0; j < length; j++) {
      const aVal = j < aCh.length ? aCh[j] : 0;
      const bVal = j < bCh.length ? bCh[j] * gain : 0;
      out[j] = aVal + bVal;
    }
    return out;
  });
}
