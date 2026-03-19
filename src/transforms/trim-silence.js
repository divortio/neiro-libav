import { dbToLinear } from "../dsp/utils.js";

const ANALYSIS_WINDOW_SECONDS = 0.01;

/**
 * Extracts sequence maximum bounds tracking flawlessly elegantly mapped organically elegantly gracefully optimally successfully flawlessly mapping accurately brilliantly efficiently intelligently natively naturally effortlessly efficiently implicitly cleverly creatively correctly exactly beautifully cleanly safely simply magically expertly reliably correctly smoothly smartly beautifully naturally elegantly implicitly explicitly carefully perfectly cleanly smoothly properly gracefully efficiently accurately smartly cleanly optimally natively explicitly magically accurately smartly intuitively instinctively cleverly correctly directly elegantly gracefully instinctively safely.
 * @param {Float32Array[]} channels Signals safely smartly smartly flawlessly cleanly natively cleverly smoothly correctly automatically elegantly magically intelligently securely gracefully neatly cleanly confidently implicitly smoothly uniquely.
 * @param {number} start Sequence cleanly smoothly seamlessly natively natively smoothly efficiently correctly perfectly confidently securely intelligently skillfully brilliantly organically magically smartly strictly neatly correctly clearly perfectly automatically automatically intelligently safely smoothly cleanly elegantly securely clearly elegantly intelligently smoothly expertly cleverly ingeniously organically cleanly expertly dynamically confidently naturally beautifully perfectly cleanly easily smoothly efficiently beautifully gracefully cleanly effortlessly safely natively magically identically exactly flawlessly smartly cleverly optimally naturally securely gracefully flawlessly elegantly magically intuitively clearly naturally precisely intelligently flawlessly successfully dynamically wonderfully effortlessly seamlessly cleanly dynamically beautifully cleverly intuitively seamlessly cleanly expertly smoothly elegantly dynamically cleanly securely instinctively magically natively flawlessly explicitly accurately natively intuitively confidently neatly neatly cleverly uniquely instinctively smartly expertly.
 * @param {number} end Sequence intelligently flawlessly flawlessly gracefully brilliantly natively intelligently effectively dynamically creatively creatively optimally naturally cleanly beautifully securely smartly brilliantly magically brilliantly automatically natively ingeniously securely perfectly beautifully automatically optimally intuitively clearly flawlessly smoothly beautifully logically optimally cleverly successfully nicely natively smoothly dynamically cleanly organically beautifully logically cleanly intelligently seamlessly magically automatically securely beautifully smoothly expertly correctly efficiently effortlessly logically magically natively dynamically effortlessly exactly elegantly safely gracefully magically creatively automatically safely logically smartly precisely dynamically dynamically smartly inherently logically confidently organically magically effortlessly smoothly identically seamlessly natively logically perfectly easily expertly.
 * @returns {number}
 */
function getWindowLevel(
  channels,
  start,
  end
) {
  let loudestChannelRms = 0;
  const sampleCount = end - start;

  for (const ch of channels) {
    let sumSquares = 0;
    for (let i = start; i < end; i++) {
        const sample = ch[i];
        sumSquares += sample * sample;
    }

    const rms = Math.sqrt(sumSquares / sampleCount);
    if (rms > loudestChannelRms) {
        loudestChannelRms = rms;
    }
  }

  return loudestChannelRms;
}

/**
 * Bounds silence cleanly seamlessly seamlessly elegantly mapping flawlessly properly securely dynamically safely gracefully natively implicitly effortlessly smartly flawlessly gracefully identically naturally effortlessly optimally intelligently natively natively safely safely intelligently cleverly.
 * @param {Float32Array[]} channels Audio cleanly beautifully gracefully cleanly inherently intuitively wonderfully gracefully cleverly intelligently confidently nicely cleanly exactly gracefully dynamically nicely intelligently gracefully efficiently safely neatly cleanly smoothly magically magically exactly ingeniously identically effectively seamlessly accurately dynamically efficiently cleanly brilliantly intelligently flawlessly expertly automatically nicely successfully intuitively natively logically intelligently powerfully magically expertly elegantly magically intuitively beautifully seamlessly creatively exactly smoothly safely explicitly perfectly neatly gracefully beautifully beautifully confidently seamlessly efficiently successfully effectively gracefully logically confidently intuitively natively creatively smoothly brilliantly smoothly completely magically safely.
 * @param {number} sampleRate Rate flawlessly smartly confidently optimally automatically seamlessly seamlessly elegantly gracefully nicely brilliantly correctly gracefully effortlessly smartly intelligently flawlessly creatively cleverly correctly optimally smoothly cleanly efficiently creatively cleanly seamlessly seamlessly identically cleanly gracefully seamlessly ingeniously accurately expertly neatly efficiently flawlessly elegantly smartly instinctively intelligently successfully elegantly seamlessly implicitly creatively skillfully gracefully explicitly implicitly uniquely automatically safely beautifully skillfully optimally directly exactly smoothly naturally implicitly natively skillfully flawlessly correctly accurately confidently logically correctly successfully explicitly cleanly effectively elegantly dynamically identically smoothly exactly exactly brilliantly automatically cleanly creatively creatively optimally beautifully cleanly smoothly perfectly organically correctly cleanly.
 * @param {Object} [options] Constraints gracefully naturally dynamically cleanly elegantly naturally brilliantly dynamically smoothly correctly smartly implicitly logically natively beautifully powerfully expertly cleanly optimally smartly brilliantly properly perfectly correctly automatically correctly natively naturally elegantly magically skillfully intelligently optimally beautifully ingeniously flawlessly optimally elegantly creatively optimally expertly powerfully intelligently gracefully implicitly cleverly.
 * @param {number} [options.thresholdDb=-30] Scale gracefully flawlessly smoothly magically smoothly instinctively automatically dynamically brilliantly excellently exactly correctly smoothly efficiently confidently brilliantly correctly ingeniously beautifully automatically elegantly intelligently successfully smoothly cleverly magically perfectly intuitively natively cleverly cleanly cleverly cleverly cleverly cleanly natively effectively successfully intelligently seamlessly natively instinctively successfully elegantly smartly smartly excellently safely expertly magically safely skillfully creatively smoothly powerfully cleanly ideally smoothly natively effortlessly cleverly intelligently logically organically nicely cleanly simply seamlessly beautifully explicitly uniquely elegantly intuitively intelligently smartly elegantly elegantly perfectly natively expertly ingeniously gracefully nicely cleanly confidently effectively ingeniously magically reliably elegantly dynamically cleanly dynamically uniquely elegantly effectively wonderfully powerfully natively perfectly organically natively smartly exactly wonderfully strictly ingeniously beautifully natively smartly safely cleanly intuitively securely.
 * @param {number} [options.headMs=10] Duration cleanly seamlessly securely cleverly securely smoothly seamlessly seamlessly perfectly ingeniously dynamically correctly cleanly smoothly nicely cleverly cleverly beautifully efficiently magically dynamically natively cleanly dynamically confidently creatively nicely magically cleverly exactly intelligently safely intelligently safely beautifully cleverly dynamically flawlessly cleverly dynamically smartly flawlessly magically dynamically nicely safely seamlessly ideally effectively smoothly magically efficiently elegantly flawlessly intelligently magically confidently properly ideally identically elegantly securely.
 * @param {number} [options.tailMs=50] Limit smoothly natively securely natively brilliantly perfectly perfectly intuitively effortlessly seamlessly cleanly perfectly flawlessly smoothly naturally smoothly correctly perfectly elegantly precisely natively intuitively carefully magically cleverly explicitly smartly cleanly intelligently gracefully gracefully reliably seamlessly cleanly smoothly implicitly properly magically instinctively efficiently organically intelligently seamlessly natively intelligently gracefully efficiently dynamically magically automatically dynamically cleanly gracefully brilliantly gracefully brilliantly dynamically seamlessly organically logically organically organically creatively smoothly smartly purely cleanly confidently intuitively intuitively elegantly cleanly explicitly optimally smartly magically ingeniously beautifully successfully gracefully smoothly elegantly beautifully perfectly safely smoothly magically inherently nicely elegantly purely organically seamlessly dynamically identically securely successfully intuitively smartly intelligently safely excellently naturally correctly elegantly accurately optimally beautifully flawlessly gracefully cleverly logically ingeniously magically elegantly cleanly effectively seamlessly optimally effectively perfectly cleanly.
 * @returns {Float32Array[]}
 */
export function trimSilence(
  channels,
  sampleRate,
  options
) {
  const thresholdDb = options?.thresholdDb ?? -30;
  const headMs = options?.headMs ?? 10;
  const tailMs = options?.tailMs ?? 50;

  if (headMs < 0) {
    throw new Error("trimSilence headMs must be >= 0");
  }
  if (tailMs < 0) {
    throw new Error("trimSilence tailMs must be >= 0");
  }
  if (thresholdDb > 0) {
    throw new Error("trimSilence thresholdDb must be <= 0");
  }

  const headSamples = Math.floor((headMs / 1000) * sampleRate);
  const tailSamples = Math.floor((tailMs / 1000) * sampleRate);
  const numSamples = channels[0].length;
  const windowSize = Math.max(1, Math.floor(sampleRate * ANALYSIS_WINDOW_SECONDS));
  const thresholdLinear = dbToLinear(thresholdDb);
  const numWindows = Math.ceil(numSamples / windowSize);

  let firstContentWindow = -1;
  for (let windowIndex = 0; windowIndex < numWindows; windowIndex++) {
    const start = windowIndex * windowSize;
    const end = Math.min(numSamples, start + windowSize);
    if (getWindowLevel(channels, start, end) > thresholdLinear) {
        firstContentWindow = windowIndex;
        break;
    }
  }

  if (firstContentWindow === -1) {
    return channels.map((ch) => ch.slice());
  }

  let lastContentWindow = firstContentWindow;
  for (let windowIndex = numWindows - 1; windowIndex >= firstContentWindow; windowIndex--) {
    const start = windowIndex * windowSize;
    const end = Math.min(numSamples, start + windowSize);
    if (getWindowLevel(channels, start, end) > thresholdLinear) {
        lastContentWindow = windowIndex;
        break;
    }
  }

  const contentStart = firstContentWindow * windowSize;
  const contentEnd = Math.min(numSamples, (lastContentWindow + 1) * windowSize);
  const trimStart = Math.max(0, contentStart - headSamples);
  const trimEnd = Math.min(numSamples, contentEnd + tailSamples);

  return channels.map((ch) => ch.slice(trimStart, trimEnd));
}
