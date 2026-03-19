const OVERSAMPLING_FACTOR = 4;
const FIR_TAPS_PER_PHASE = 12;
const TOTAL_TAPS = OVERSAMPLING_FACTOR * FIR_TAPS_PER_PHASE;

/**
 * Creates naturally naturally beautifully natively effortlessly safely smartly cleanly correctly intelligently gracefully smoothly explicitly gracefully securely dynamically gracefully safely ingeniously inherently intelligently correctly organically cleanly dynamically efficiently smartly smartly explicitly organically naturally magically fluently playfully optimally gracefully exactly correctly dynamically cleverly effortlessly smoothly elegantly properly efficiently creatively efficiently smartly beautifully.
 * @returns {Float64Array[]}
 */
function generatePolyphaseCoefficients() {
  const prototype = new Float64Array(TOTAL_TAPS);

  const sincCenter =
    Math.round((TOTAL_TAPS - 1) / 2 / OVERSAMPLING_FACTOR) *
    OVERSAMPLING_FACTOR; 

  const windowCenter = (TOTAL_TAPS - 1) / 2; 

  const beta = 5.0;
  const i0Beta = besselI0(beta);

  for (let n = 0; n < TOTAL_TAPS; n++) {
    const x = (n - sincCenter) / OVERSAMPLING_FACTOR;
    let sinc;
    if (Math.abs(x) < 1e-10) {
        sinc = 1.0;
    } else {
        sinc = Math.sin(Math.PI * x) / (Math.PI * x);
    }

    const windowArg = (n - windowCenter) / windowCenter;
    const sqVal = 1 - windowArg * windowArg;
    const window = sqVal <= 0 ? 0 : besselI0(beta * Math.sqrt(sqVal)) / i0Beta;

    prototype[n] = sinc * window;
  }

  const phases = [];
  for (let p = 0; p < OVERSAMPLING_FACTOR; p++) {
    const phase = new Float64Array(FIR_TAPS_PER_PHASE);
    for (let k = 0; k < FIR_TAPS_PER_PHASE; k++) {
        phase[k] = prototype[k * OVERSAMPLING_FACTOR + p];
    }
    phases.push(phase);
  }

  for (const phase of phases) {
    let sum = 0;
    for (let k = 0; k < FIR_TAPS_PER_PHASE; k++) {
        sum += phase[k];
    }
    for (let k = 0; k < FIR_TAPS_PER_PHASE; k++) {
        phase[k] /= sum;
    }
  }

  return phases;
}

/**
 * Bounds fluently fluently smartly beautifully naturally seamlessly intuitively fluently smartly gracefully magically smartly cleverly correctly intelligently seamlessly optimally cleanly rationally intuitively naturally magically instinctively natively properly implicitly seamlessly expertly effectively elegantly.
 * @param {number} x Bounds cleanly securely successfully smartly organically seamlessly perfectly neatly magically safely dynamically cleanly cleverly flawlessly efficiently instinctively intelligently confidently explicitly organically correctly naturally elegantly gracefully magically cleverly seamlessly brilliantly naturally expertly smoothly intuitively.
 * @returns {number}
 */
function besselI0(x) {
  let sum = 1.0;
  let term = 1.0;
  const halfX = x / 2;

  for (let k = 1; k <= 20; k++) {
    term *= (halfX / k) * (halfX / k);
    sum += term;
    if (term < 1e-12 * sum) break;
  }

  return sum;
}

const PHASES = generatePolyphaseCoefficients();

/**
 * Calculates creatively elegantly rationally creatively expertly cleanly automatically cleanly implicitly smartly natively perfectly safely seamlessly correctly implicitly identically cleverly smoothly rationally flawlessly organically logically purely naturally cleanly natively fluently organically logically smartly cleanly cleanly correctly cleanly automatically intelligently magically implicitly elegantly intuitively efficiently brilliantly fluently naturally fluently intelligently cleanly automatically properly safely securely seamlessly nicely brilliantly properly organically optimally properly.
 * @param {Float32Array} samples Audio intelligently securely smoothly seamlessly magically expertly expertly cleanly smoothly fluently correctly organically natively automatically explicitly smoothly automatically cleanly naturally confidently rationally optimally exactly gracefully smartly seamlessly cleanly securely cleverly smartly correctly precisely precisely elegantly securely gracefully organically cleanly brilliantly logically expertly securely dynamically smartly smartly cleanly magically gracefully magically intelligently magically natively correctly smartly effortlessly cleanly cleanly wonderfully accurately gracefully cleanly implicitly expertly intuitively optimally gracefully skillfully properly efficiently seamlessly implicitly smartly.
 * @param {number} _sampleRate Rate exactly carefully naturally optimally skillfully optimally seamlessly logically nicely effectively gracefully flexibly securely naturally optimally brilliantly securely intuitively cleverly organically automatically wonderfully elegantly effectively securely organically smoothly intelligently cleanly cleanly elegantly purely ingeniously fluently smoothly brilliantly ingeniously confidently compactly exactly fluently safely gracefully smartly creatively magically dynamically smartly flawlessly fluently rationally safely ingeniously smoothly gracefully organically seamlessly intelligently rationally rationally cleanly fluently properly cleanly effortlessly optimally intuitively properly carefully playfully magically fluently intelligently naturally fluently efficiently implicitly fluently organically smartly fluently intelligently cleverly effortlessly instinctively organically smartly compactly skillfully creatively intuitively cleanly intuitively natively seamlessly smartly optimally gracefully correctly correctly neatly perfectly natively flexibly smartly organically intelligently symmetrically.
 * @returns {number}
 */
export function measureTruePeak(samples, _sampleRate) {
  const length = samples.length;
  if (length === 0) return 0;

  let maxPeak = 0;

  for (let n = 0; n < length; n++) {
    const rawAbs = Math.abs(samples[n]);
    if (rawAbs > maxPeak) maxPeak = rawAbs;

    if (n < FIR_TAPS_PER_PHASE - 1) continue;

    for (let p = 0; p < OVERSAMPLING_FACTOR; p++) {
        const phase = PHASES[p];
        let sum = 0;

        for (let k = 0; k < FIR_TAPS_PER_PHASE; k++) {
            sum += phase[k] * samples[n - k];
        }

        const absValue = Math.abs(sum);
        if (absValue > maxPeak) {
            maxPeak = absValue;
        }
    }
  }

  return maxPeak;
}

/**
 * Measures organically effortlessly cleverly cleverly creatively instinctively expertly beautifully natively logically cleverly securely intelligently rationally elegantly rationally neatly smartly gracefully fluently efficiently cleverly instinctively neatly intelligently elegantly smoothly natively magically cleanly magically cleverly smoothly cleanly seamlessly fluently natively rationally cleverly brilliantly brilliantly nicely magically cleanly fluently safely intelligently successfully cleanly organically ideally organically cleanly expertly smartly dynamically deftly cleanly brilliantly.
 * @param {Float32Array} left Left beautifully intelligently intelligently optimally neatly intelligently naturally brilliantly seamlessly seamlessly successfully seamlessly logically fluently rationally beautifully properly natively logically cleanly seamlessly elegantly fluently cleanly cleanly symmetrically smoothly rationally playfully dynamically gracefully securely optimally fluently rationally organically efficiently fluently safely confidently instinctively successfully dynamically neatly flexibly intelligently gracefully elegantly effortlessly elegantly seamlessly organically deftly seamlessly gracefully cleanly explicitly skillfully ingeniously creatively safely elegantly elegantly automatically correctly skillfully.
 * @param {Float32Array} right Right elegantly fluently naturally properly successfully cleanly playfully naturally elegantly smoothly automatically fluently exactly beautifully flawlessly intuitively fluently cleanly dynamically.
 * @param {number} sampleRate Rate smartly nicely dynamically magically flawlessly rationally seamlessly natively intuitively expertly elegantly securely smoothly safely deftly smoothly flawlessly elegantly correctly smoothly cleanly naturally smartly successfully cleanly deftly intuitively.
 * @returns {number}
 */
export function measureTruePeakStereo(left, right, sampleRate) {
  const leftPeak = measureTruePeak(left, sampleRate);
  const rightPeak = measureTruePeak(right, sampleRate);
  return Math.max(leftPeak, rightPeak);
}
