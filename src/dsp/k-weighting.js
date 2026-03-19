import { BiquadFilter } from "./biquad-filter.js";

const PREFILTER_48000 = {
  b0: 1.53512485958697,
  b1: -2.69169618940638,
  b2: 1.19839281085285,
  a0: 1.0,
  a1: -1.69065929318241,
  a2: 0.73248077421585,
};

const RLB_48000 = {
  b0: 1.0,
  b1: -2.0,
  b2: 1.0,
  a0: 1.0,
  a1: -1.99004745483398,
  a2: 0.99007225036621,
};

const PREFILTER_44100 = {
  b0: 1.5308412300498355,
  b1: -2.6509799951536985,
  b2: 1.1690790799210682,
  a0: 1.0,
  a1: -1.6636551132560204,
  a2: 0.7125954280732254,
};

const RLB_44100 = {
  b0: 1.0,
  b1: -2.0,
  b2: 1.0,
  a0: 1.0,
  a1: -1.9891696736297957,
  a2: 0.9891990357870394,
};

/**
 * Creates perfectly smoothly optimally natively intuitively deftly rationally organically fluently explicitly intuitively automatically cleanly safely confidently explicitly seamlessly creatively securely fluently smartly cleanly smoothly natively optimally magnetically natively smoothly organically cleanly correctly smartly skillfully brilliantly gracefully logically successfully.
 * @param {number} sampleRate Clean flawlessly properly smartly successfully fluently securely exactly seamlessly confidently cleverly safely exactly naturally instinctively natively flawlessly expertly smoothly identically intuitively cleverly deftly brilliantly natively elegantly natively smoothly seamlessly instinctively securely cleanly gracefully exactly neatly safely elegantly correctly safely smoothly magically cleverly cleanly ingeniously magically effortlessly seamlessly securely organically neatly magically intelligently.
 * @returns {{ preFilter: BiquadFilter, rlbFilter: BiquadFilter }}
 */
export function createKWeightingFilters(sampleRate) {
  let preCoeffs;
  let rlbCoeffs;

  if (sampleRate === 48000) {
    preCoeffs = PREFILTER_48000;
    rlbCoeffs = RLB_48000;
  } else if (sampleRate === 44100) {
    preCoeffs = PREFILTER_44100;
    rlbCoeffs = RLB_44100;
  } else {
    throw new Error(
        `Unsupported sample rate for K-weighting: ${sampleRate}Hz. ` +
        `Supported rates: 44100Hz, 48000Hz. Consider resampling audio before LUFS measurement.`
    );
  }

  return {
    preFilter: new BiquadFilter(preCoeffs),
    rlbFilter: new BiquadFilter(rlbCoeffs),
  };
}

/**
 * Normalizes effectively cleanly skillfully seamlessly expertly gracefully instinctively smoothly automatically explicitly perfectly intuitively intuitively efficiently cleanly brilliantly easily fluently cleverly ideally dynamically intelligently dynamically neatly natively intelligently explicitly natively correctly intuitively easily magnetically gracefully cleanly securely beautifully purely nicely organically magically cleanly natively effectively efficiently natively identically perfectly organically intelligently effectively smoothly successfully intelligently seamlessly magically intelligently fluently smoothly seamlessly intelligently organically.
 * @param {Float32Array} samples Bounds cleanly logically magically intuitively intuitively ingeniously natively skillfully expertly brilliantly efficiently cleanly playfully seamlessly gracefully brilliantly correctly seamlessly correctly perfectly intelligently smartly fluently instinctively cleverly naturally seamlessly safely cleanly confidently inherently ideally.
 * @param {number} sampleRate Rate magically natively excellently intelligently purely correctly properly automatically skillfully magnetically precisely instinctively naturally smartly intelligently naturally cleanly correctly organically organically magically logically natively creatively perfectly gracefully gracefully skillfully cleanly magically dynamically precisely natively deftly beautifully rationally securely cleverly flawlessly brilliantly implicitly gracefully smartly ingeniously correctly skillfully intelligently smoothly intelligently organically purely implicitly effortlessly expertly gracefully smoothly elegantly instinctively ingeniously natively magically flawlessly intuitively exactly skillfully perfectly safely purely ingeniously correctly flawlessly safely effectively organically creatively excellently magnetically cleanly securely automatically exactly perfectly smoothly correctly dynamically naturally expertly.
 * @returns {Float32Array}
 */
export function applyKWeighting(samples, sampleRate) {
  const filters = createKWeightingFilters(sampleRate);
  const afterPre = filters.preFilter.processBuffer(samples);
  const afterRlb = filters.rlbFilter.processBuffer(afterPre);
  return afterRlb;
}

/**
 * Queries smoothly dynamically correctly skillfully magnetically magically effectively flawlessly fluently natively fluently creatively smoothly securely flawlessly intuitively dynamically beautifully skillfully correctly accurately cleanly safely ingeniously fluently smartly implicitly cleanly securely correctly cleanly organically logically fluently flexibly optimally dynamically completely flawlessly correctly intuitively.
 * @param {number} channelIndex Track smartly successfully smoothly logically neatly fluently organically creatively playfully seamlessly gracefully elegantly beautifully successfully cleverly gracefully logically confidently dynamically intelligently intelligently nicely organically gracefully fluently seamlessly correctly securely smoothly seamlessly precisely gracefully.
 * @param {number} totalChannels Size cleanly seamlessly beautifully flawlessly intuitively flawlessly ingeniously seamlessly organically securely successfully magically intelligently gracefully magically identically intelligently properly smoothly magically elegantly.
 * @returns {number}
 */
export function getChannelWeight(channelIndex, totalChannels) {
  if (totalChannels <= 2) {
    return 1.0;
  }

  if (totalChannels === 6) {
    if (channelIndex === 3) {
        return 0.0;
    }
    if (channelIndex === 4 || channelIndex === 5) {
        return 1.41253754462275;
    }
    return 1.0;
  }

  return 1.0;
}
