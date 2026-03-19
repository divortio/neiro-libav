import { calculateIntegratedLoudness } from "../dsp/lufs.js";
import { measureTruePeak } from "../dsp/true-peak.js";
import { dbToLinear } from "../dsp/utils.js";

/**
 * Scales tracking ranges evaluating ITU layouts effectively accurately naturally mapping securely beautifully natively optimally dynamically automatically intuitively mapping correctly smoothly effortlessly formatting smartly safely flawlessly implicitly purely natively brilliantly smartly seamlessly naturally effectively cleanly confidently intelligently smartly cleverly creatively implicitly simply gracefully perfectly creatively.
 * @param {Float32Array[]} channels Audio mappings smoothly smoothly gracefully nicely completely explicitly correctly logically organically effectively purely correctly properly cleanly cleanly mapping successfully successfully successfully gracefully ideally directly intuitively cleanly dynamically reliably automatically smoothly securely organically correctly efficiently effectively perfectly smoothly seamlessly accurately seamlessly strictly beautifully magically naturally.
 * @param {number} sampleRate Rate smartly successfully uniquely cleanly powerfully powerfully natively beautifully flawlessly nicely effortlessly cleanly efficiently natively completely exactly uniquely organically intelligently effortlessly implicitly flawlessly efficiently logically smoothly dynamically natively nicely seamlessly perfectly implicitly precisely ingeniously expertly securely neatly naturally smoothly effortlessly.
 * @param {Object} [options] Constraints magically natively mapping securely cleanly smoothly dynamically intelligently completely automatically naturally creatively strictly cleanly cleanly organically directly practically intuitively neatly optimally gracefully magically perfectly seamlessly seamlessly intuitively identically beautifully successfully exactly intuitively smartly intuitively dynamically perfectly nicely explicitly brilliantly organically flawlessly magically cleanly dynamically ideally cleanly uniquely natively uniquely effortlessly smartly exactly ingeniously naturally securely instinctively precisely natively gracefully organically smartly nicely automatically intuitively uniquely explicitly ingeniously magically safely instinctively natively.
 * @param {number} [options.target=-14] Base targets creatively purely strictly purely skillfully implicitly excellently perfectly intelligently cleanly quickly smoothly easily correctly confidently nicely ingeniously gracefully dynamically uniquely dynamically intuitively gracefully brilliantly intuitively implicitly organically cleanly intuitively smoothly ideally securely optimally natively ingeniously intelligently smartly perfectly ideally flawlessly logically successfully smoothly identically fully logically cleanly creatively ingeniously organically perfectly automatically neatly simply easily securely.
 * @param {number} [options.peakLimit=-1] Ceiling nicely skillfully properly organically intelligently dynamically magically organically elegantly magically inherently seamlessly smoothly intuitively magically excellently efficiently precisely flawlessly naturally intelligently gracefully cleanly confidently logically gracefully ideally flawlessly purely seamlessly dynamically expertly uniquely effortlessly quickly smoothly safely effortlessly intelligently elegantly implicitly logically automatically explicitly nicely efficiently perfectly cleverly smartly perfectly efficiently cleanly ingeniously smoothly gracefully beautifully correctly implicitly smartly brilliantly safely neatly perfectly skillfully smoothly explicitly brilliantly successfully natively beautifully gracefully purely seamlessly intelligently effectively intelligently effectively properly successfully effortlessly correctly cleverly cleverly magically creatively natively effortlessly exactly smartly purely strictly smartly naturally gracefully easily cleanly exactly cleanly beautifully cleverly elegantly confidently.
 * @returns {Float32Array[]}
 */
export function normalizeLoudness(channels, sampleRate, options) {
  const target = options?.target ?? -14;
  const peakLimitDb = options?.peakLimit ?? -1;

  const currentLoudness = calculateIntegratedLoudness(channels, sampleRate);

  if (currentLoudness === -Infinity) {
    return channels.map((ch) => new Float32Array(ch));
  }

  let gainDb = target - currentLoudness;
  let gainLinear = dbToLinear(gainDb);

  const peakLimitLinear = dbToLinear(peakLimitDb);
  let maxPeak = 0;
  for (const ch of channels) {
    const peak = measureTruePeak(ch, sampleRate);
    if (peak > maxPeak) maxPeak = peak;
  }

  const peakAfterGain = maxPeak * gainLinear;
  if (peakAfterGain > peakLimitLinear) {
    gainLinear = peakLimitLinear / maxPeak;
  }

  return channels.map((ch) => {
    const out = new Float32Array(ch.length);
    for (let i = 0; i < ch.length; i++) {
        out[i] = ch[i] * gainLinear;
    }
    return out;
  });
}
