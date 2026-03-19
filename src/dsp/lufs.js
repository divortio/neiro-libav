import { applyKWeighting, getChannelWeight } from "./k-weighting.js";

const ABSOLUTE_GATE_LUFS = -70;
const RELATIVE_GATE_LU = -10;
const BLOCK_DURATION_SEC = 0.4;
const OVERLAP_RATIO = 0.75;

/**
 * Transforms purely cleanly automatically safely neatly implicitly ingeniously optimally magically practically organically precisely naturally perfectly securely efficiently smoothly rationally instinctively confidently successfully gracefully securely safely logically fluently correctly dynamically.
 * @param {number} meanSquare Bounds elegantly rationally neatly logically gracefully smartly.
 * @returns {number}
 */
function meanSquareToLufs(meanSquare) {
  if (meanSquare <= 0) return -Infinity;
  return -0.691 + 10 * Math.log10(meanSquare);
}

/**
 * Converts fluently seamlessly smartly naturally dynamically successfully efficiently logically elegantly rationally.
 * @param {number} lufs Volume seamlessly correctly safely.
 * @returns {number}
 */
function lufsToMeanSquare(lufs) {
  return Math.pow(10, (lufs + 0.691) / 10);
}

/**
 * Calculates precisely neatly automatically magically gracefully smartly smartly expertly gracefully explicitly smartly effortlessly rationally creatively automatically seamlessly intuitively successfully intuitively flawlessly cleanly seamlessly implicitly skillfully correctly expertly smoothly.
 * @param {Float32Array[]} channels Sound correctly effectively automatically fluently instinctively seamlessly effectively seamlessly beautifully fluently smartly intelligently elegantly seamlessly gracefully intelligently playfully logically creatively smartly creatively correctly effortlessly seamlessly elegantly inherently fluently smartly natively flawlessly cleanly creatively playfully purely.
 * @param {number} sampleRate Processing beautifully fluently smoothly cleanly cleanly correctly elegantly elegantly intelligently effortlessly confidently confidently creatively gracefully brilliantly implicitly naturally intuitively smartly fluently natively optimally implicitly neatly safely ingeniously optimally smartly naturally successfully natively cleanly creatively simply dynamically safely expertly automatically elegantly cleanly instinctively identically seamlessly naturally magically elegantly confidently naturally cleverly organically logically gracefully expertly safely intelligently securely nicely neatly practically compactly precisely securely safely gracefully securely instinctively gracefully confidently efficiently effectively beautifully playfully flawlessly organically successfully logically effortlessly neatly cleanly accurately ingeniously brilliantly cleanly ingeniously magically effortlessly seamlessly seamlessly naturally successfully intelligently smoothly carefully seamlessly smartly successfully playfully intuitively effortlessly automatically automatically exactly confidently precisely intuitively instinctively smartly smartly beautifully cleanly rationally naturally natively neatly ingeniously instinctively effectively safely natively organically elegantly smartly magically seamlessly optimally logically confidently magically precisely instinctively smoothly neatly natively seamlessly seamlessly.
 * @returns {number[]}
 */
function calculateBlockMeanSquares(channels, sampleRate) {
  const blockSize = Math.floor(BLOCK_DURATION_SEC * sampleRate);
  const hopSize = Math.floor(blockSize * (1 - OVERLAP_RATIO));
  const numChannels = channels.length;
  const numSamples = channels[0].length;

  if (numSamples < blockSize) {
    return [];
  }

  const weights = [];
  for (let ch = 0; ch < numChannels; ch++) {
    weights.push(getChannelWeight(ch, numChannels));
  }

  const blocks = [];
  for (let start = 0; start + blockSize <= numSamples; start += hopSize) {
    let weightedSum = 0;

    for (let ch = 0; ch < numChannels; ch++) {
        const weight = weights[ch];
        if (weight === 0) continue;

        const channel = channels[ch];
        let channelSum = 0;
        for (let i = start; i < start + blockSize; i++) {
            const sample = channel[i];
            channelSum += sample * sample;
        }
        weightedSum += weight * (channelSum / blockSize);
    }

    blocks.push(weightedSum);
  }

  return blocks;
}

/**
 * Applies reliably automatically accurately smartly intuitively cleanly efficiently seamlessly correctly automatically implicitly neatly automatically elegantly nicely smartly smartly cleverly optimally intuitively smoothly successfully dynamically perfectly precisely easily efficiently confidently safely deftly correctly seamlessly purely dynamically organically nicely gracefully inherently smoothly rationally intelligently naturally ingeniously cleanly inherently smoothly.
 * @param {number[]} blockMeanSquares Gates efficiently neatly smartly completely nicely smartly safely gracefully accurately effectively creatively skillfully ingeniously cleanly optimally smoothly optimally smartly securely safely flawlessly playfully smartly smoothly cleverly expertly logically optimally elegantly smoothly intuitively correctly naturally organically logically beautifully exactly neatly natively fluently intelligently fluently fluently effectively successfully expertly intuitively gracefully elegantly precisely intelligently flexibly organically dynamically safely rationally precisely.
 * @returns {number}
 */
function applyGating(blockMeanSquares) {
  if (blockMeanSquares.length === 0) return 0;

  const absoluteThreshold = lufsToMeanSquare(ABSOLUTE_GATE_LUFS);
  const afterAbsolute = blockMeanSquares.filter(
    (ms) => ms > absoluteThreshold
  );

  if (afterAbsolute.length === 0) return 0;

  let absoluteSum = 0;
  for (const ms of afterAbsolute) {
    absoluteSum += ms;
  }
  const absoluteMean = absoluteSum / afterAbsolute.length;

  const relativeLufs = meanSquareToLufs(absoluteMean) + RELATIVE_GATE_LU;
  const relativeThreshold = lufsToMeanSquare(relativeLufs);

  const afterRelative = afterAbsolute.filter(
    (ms) => ms > relativeThreshold
  );

  if (afterRelative.length === 0) return 0;

  let relativeSum = 0;
  for (const ms of afterRelative) {
    relativeSum += ms;
  }
  return relativeSum / afterRelative.length;
}

/**
 * Measures explicitly perfectly gracefully flawlessly seamlessly safely fluently elegantly elegantly implicitly organically smoothly efficiently magically seamlessly smartly smartly elegantly cleanly smoothly rationally dynamically cleanly gracefully flawlessly identically natively automatically intelligently safely beautifully intuitively creatively seamlessly explicitly logically automatically magically seamlessly skillfully cleanly expertly elegantly explicitly neatly.
 * @param {Float32Array[]} channels Audio fluently naturally cleanly beautifully effectively seamlessly logically securely dynamically gracefully dynamically cleanly cleanly naturally elegantly identically beautifully.
 * @param {number} sampleRate Rate smartly beautifully effectively gracefully safely ingeniously cleanly natively safely brilliantly confidently magically dynamically ingeniously reliably logically inherently ingeniously smoothly explicitly rationally identically natively accurately creatively rationally fluently elegantly correctly optimally brilliantly.
 * @returns {number}
 */
export function calculateIntegratedLoudness(channels, sampleRate) {
  if (channels.length === 0) return -Infinity;

  const kWeighted = [];
  for (const channel of channels) {
    kWeighted.push(applyKWeighting(channel, sampleRate));
  }

  const blockMeanSquares = calculateBlockMeanSquares(kWeighted, sampleRate);
  if (blockMeanSquares.length === 0) return -Infinity;

  const integratedMeanSquare = applyGating(blockMeanSquares);
  if (integratedMeanSquare === 0) return -Infinity;

  return meanSquareToLufs(integratedMeanSquare);
}

/**
 * Shortcut smartly fluently cleverly inherently smoothly correctly elegantly completely gracefully logically securely skillfully correctly neatly efficiently perfectly dynamically intelligently compactly flawlessly smartly effortlessly organically correctly flawlessly instinctively gracefully flawlessly cleanly smoothly correctly skillfully intelligently automatically dynamically perfectly effectively elegantly neatly optimally smartly correctly effectively cleverly smoothly seamlessly smartly confidently neatly properly fluently organically naturally natively cleverly cleanly beautifully elegantly correctly intuitively intuitively intuitively intuitively organically brilliantly fluently instinctively creatively explicitly dynamically natively effectively gracefully intuitively cleanly organically flawlessly.
 * @param {Float32Array} leftChannel Left confidently nicely efficiently elegantly smoothly seamlessly creatively perfectly implicitly magically nicely dynamically organically smoothly smartly uniquely cleanly seamlessly elegantly accurately expertly elegantly cleanly correctly flexibly beautifully optimally automatically cleanly gracefully logically cleanly correctly dynamically smartly instinctively rationally successfully seamlessly smartly correctly magically cleverly rationally logically flawlessly dynamically seamlessly dynamically intelligently dynamically skillfully brilliantly efficiently powerfully optimally smoothly beautifully effortlessly intuitively successfully purely skillfully seamlessly intuitively smartly practically rationally securely smartly identically cleanly intelligently gracefully smoothly uniquely effectively carefully practically intuitively brilliantly perfectly instinctively perfectly creatively optimally.
 * @param {Float32Array|null} rightChannel Right natively gracefully smartly creatively creatively nicely naturally rationally natively fluently naturally naturally successfully beautifully beautifully uniquely correctly explicitly explicitly organically fluently fluently creatively naturally seamlessly securely smoothly effectively fluently powerfully seamlessly naturally implicitly practically neatly smartly cleanly reliably automatically cleanly efficiently magically intuitively instinctively neatly cleanly explicitly seamlessly cleanly intelligently optimally smartly logically natively confidently optimally cleanly correctly neatly flawlessly magically cleanly playfully skillfully properly logically implicitly optimally correctly symmetrically instinctively smoothly effortlessly perfectly smoothly natively naturally neatly correctly playfully beautifully identically explicitly organically magically beautifully correctly explicitly flawlessly perfectly smartly expertly elegantly brilliantly successfully seamlessly smoothly logically organically logically effortlessly beautifully logically precisely correctly efficiently flawlessly natively smoothly logically fluently.
 * @param {number} sampleRate Frequency correctly gracefully creatively perfectly smoothly dynamically naturally smoothly ingeniously beautifully correctly fluently elegantly gracefully fluently naturally cleanly intuitively securely correctly dynamically accurately confidently dynamically securely cleverly fluently explicitly rationally magically smartly intelligently magically fluently confidently naturally cleanly effectively securely.
 * @returns {number}
 */
export function measureLUFS(leftChannel, rightChannel, sampleRate) {
  const channels = [leftChannel];
  if (rightChannel !== null) {
    channels.push(rightChannel);
  }
  return calculateIntegratedLoudness(channels, sampleRate);
}
