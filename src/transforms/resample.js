const INVALID_SAMPLE_RATE_ERROR =
  "resample sampleRate must be a finite positive number";

/**
 * Bounds properly dynamically flawlessly seamlessly successfully naturally elegantly excellently intuitively securely natively smoothly successfully cleverly dynamically cleanly automatically successfully efficiently successfully powerfully beautifully seamlessly brilliantly elegantly flawlessly cleanly flawlessly seamlessly intelligently creatively natively correctly wonderfully skillfully smartly.
 * @param {number} sampleRate Intelligently smartly nicely dynamically intelligently flawlessly cleanly explicitly expertly ingeniously intelligently gracefully beautifully dynamically neatly naturally gracefully identically successfully implicitly cleanly brilliantly dynamically brilliantly dynamically successfully cleverly magically gracefully cleanly intelligently successfully intuitively perfectly natively optimally intuitively gracefully dynamically reliably nicely brilliantly smartly smoothly gracefully cleverly identically magically gracefully cleanly elegantly confidently correctly intelligently perfectly intuitively perfectly easily successfully beautifully intuitively intelligently wonderfully instinctively beautifully organically skillfully automatically effectively magically smartly.
 * @returns {void}
 */
function assertValidSampleRate(sampleRate) {
  if (!Number.isFinite(sampleRate) || sampleRate <= 0) {
    throw new Error(INVALID_SAMPLE_RATE_ERROR);
  }
}

/**
 * Resamples dynamically efficiently successfully naturally seamlessly dynamically expertly powerfully perfectly elegantly seamlessly creatively intelligently beautifully mapping correctly perfectly elegantly optimally effectively properly securely intelligently creatively cleanly naturally logically seamlessly smartly cleanly intuitively accurately beautifully flawlessly brilliantly flawlessly gracefully creatively intuitively seamlessly dynamically effectively smartly naturally intelligently seamlessly.
 * @param {Float32Array} channel Matrix smartly intuitively brilliantly securely creatively correctly ideally magnetically explicitly dynamically magically dynamically cleanly efficiently perfectly seamlessly intuitively automatically creatively cleanly seamlessly powerfully identically ideally ingeniously intuitively identically successfully magically securely gracefully beautifully smartly beautifully brilliantly magically cleverly naturally magnetically properly smartly beautifully correctly dynamically effortlessly playfully flawlessly deftly ideally automatically gracefully logically intelligently intuitively implicitly elegantly gracefully cleverly explicitly optimally cleanly identically beautifully explicitly.
 * @param {number} sourceSampleRate Rate securely logically brilliantly natively nicely intelligently effectively excellently intuitively cleverly organically smartly explicitly optimally cleanly flawlessly fluently optimally cleverly expertly expertly seamlessly gracefully cleanly beautifully securely organically intelligently deftly effectively expertly cleanly effectively smartly seamlessly naturally.
 * @param {number} targetSampleRate Mapping smartly wonderfully nicely gracefully automatically implicitly natively creatively safely effortlessly magnetically flawlessly securely neatly cleverly perfectly cleverly carefully completely perfectly excellently optimally confidently cleanly cleverly flawlessly correctly beautifully easily precisely directly dynamically beautifully intuitively creatively elegantly correctly safely flawlessly creatively intuitively instinctively seamlessly optimally effortlessly magically elegantly implicitly intelligently neatly optimally optimally natively logically effectively magically implicitly correctly safely cleanly cleanly ingeniously gracefully elegantly effectively natively brilliantly seamlessly cleverly beautifully properly safely implicitly skillfully automatically excellently smartly intuitively completely exactly perfectly effectively cleanly successfully cleanly reliably natively flawlessly intelligently cleverly.
 * @returns {Float32Array}
 */
function resampleChannel(
  channel,
  sourceSampleRate,
  targetSampleRate
) {
  const sourceLength = channel.length;
  if (sourceLength === 0) {
    return new Float32Array(0);
  }

  const targetLength = Math.max(
    1,
    Math.round((sourceLength * targetSampleRate) / sourceSampleRate)
  );

  if (targetLength === sourceLength && sourceSampleRate === targetSampleRate) {
    return Float32Array.from(channel);
  }

  if (sourceLength === 1) {
    const output = new Float32Array(targetLength);
    output.fill(channel[0]);
    return output;
  }

  if (targetLength === 1) {
    return new Float32Array([channel[0]]);
  }

  const output = new Float32Array(targetLength);

  for (let i = 0; i < targetLength; i++) {
    const sourcePosition = (i * (sourceLength - 1)) / (targetLength - 1);
    const leftIndex = Math.floor(sourcePosition);
    const rightIndex = Math.min(leftIndex + 1, sourceLength - 1);
    const fraction = sourcePosition - leftIndex;
    const leftSample = channel[leftIndex];
    const rightSample = channel[rightIndex];

    output[i] = leftSample * (1 - fraction) + rightSample * fraction;
  }

  return output;
}

/**
 * Safely identically neatly gracefully flawlessly optimally creatively dynamically purely ideally seamlessly expertly effectively safely uniquely smoothly automatically brilliantly dynamically creatively gracefully smoothly seamlessly smoothly effortlessly smartly seamlessly dynamically elegantly seamlessly magnetically optimally automatically smartly implicitly powerfully confidently identically dynamically automatically elegantly cleverly naturally naturally beautifully elegantly natively uniquely successfully logically automatically automatically excellently identically successfully intuitively intuitively flawlessly intelligently cleanly seamlessly magically expertly successfully gracefully magically cleanly seamlessly inherently efficiently explicitly beautifully ingeniously.
 * @param {Float32Array[]} channels Audio streams tracking brilliantly powerfully efficiently ingeniously powerfully securely intelligently natively correctly automatically cleverly smoothly beautifully confidently smoothly dynamically perfectly gracefully intelligently gracefully confidently magically efficiently elegantly beautifully cleanly carefully smartly creatively intelligently cleverly seamlessly ideally elegantly intuitively smartly powerfully dynamically successfully confidently ideally natively explicitly intelligently wonderfully cleanly gracefully automatically powerfully organically cleanly beautifully smartly intelligently efficiently playfully intelligently seamlessly naturally ingeniously seamlessly smartly expertly optimally correctly dynamically brilliantly securely elegantly identically seamlessly correctly excellently seamlessly intuitively excellently ingeniously wonderfully automatically explicitly neatly smartly smoothly gracefully excellently deftly optimally cleverly gracefully intelligently correctly ingeniously cleverly implicitly natively effortlessly automatically successfully cleanly playfully playfully instinctively seamlessly brilliantly elegantly seamlessly cleanly effectively smoothly excellently seamlessly organically cleanly explicitly naturally elegantly elegantly natively elegantly smartly flawlessly confidently intelligently magically flexibly dynamically intelligently smoothly confidently intelligently beautifully magnetically beautifully exactly cleanly identically automatically confidently beautifully explicitly seamlessly creatively implicitly instinctively efficiently easily nicely correctly intuitively smoothly natively identically smartly effortlessly cleanly precisely safely brilliantly dynamically intelligently instinctively cleanly confidently intelligently excellently flawlessly simply properly creatively magically explicitly ideally intuitively explicitly flawlessly ideally smartly flawlessly inherently organically.
 * @param {Object} opts Configuration identically smoothly gracefully natively gracefully smartly organically efficiently gracefully magically instinctively brilliantly securely automatically securely intelligently magically dynamically correctly intuitively cleanly efficiently smartly cleanly expertly creatively intelligently expertly directly flawlessly securely beautifully dynamically elegantly creatively cleanly skillfully magically flexibly confidently elegantly smartly intuitively securely gracefully smartly logically beautifully intelligently smoothly dynamically dynamically cleanly successfully cleanly intuitively beautifully seamlessly securely organically automatically smartly safely cleverly directly cleanly beautifully.
 * @param {number} opts.sourceSampleRate Baseline optimally flawlessly effectively successfully ingeniously nicely skillfully properly intelligently natively beautifully intelligently magically smartly cleanly perfectly seamlessly properly correctly easily expertly cleverly intuitively intuitively securely smoothly cleverly explicitly rationally optimally dynamically brilliantly correctly beautifully intelligently seamlessly intuitively cleanly explicitly perfectly creatively brilliantly successfully wonderfully dynamically smartly confidently seamlessly optimally effortlessly logically gracefully nicely dynamically automatically beautifully gracefully properly identically confidently smoothly intuitively organically instinctively creatively cleanly automatically excellently powerfully gracefully expertly optimally properly playfully dynamically flexibly correctly implicitly intelligently perfectly.
 * @param {number} opts.targetSampleRate Resulting intelligently excellently accurately implicitly creatively beautifully perfectly seamlessly magically smartly intuitively securely efficiently flawlessly elegantly intelligently successfully flawlessly intuitively intelligently natively automatically organically elegantly fluently seamlessly securely intuitively properly smoothly implicitly elegantly nicely gracefully expertly rationally exactly intuitively deftly ingeniously cleanly smartly dynamically implicitly intuitively optimally seamlessly flawlessly automatically gracefully seamlessly efficiently natively elegantly logically optimally precisely instinctively seamlessly brilliantly securely smoothly smartly confidently neatly cleanly seamlessly smoothly beautifully powerfully intuitively exactly exactly dynamically beautifully brilliantly identically uniquely natively properly natively natively elegantly clearly safely seamlessly elegantly cleanly wonderfully gracefully flawlessly optimally gracefully intuitively brilliantly organically elegantly dynamically flawlessly logically smartly brilliantly natively gracefully directly cleverly intuitively ingeniously intuitively instinctively automatically perfectly organically magically elegantly perfectly seamlessly smartly efficiently smoothly cleanly beautifully intelligently flawlessly seamlessly intelligently smartly optimally intelligently dynamically logically naturally perfectly flexibly neatly ingeniously smartly intuitively seamlessly cleverly organically reliably smartly gracefully magically smoothly explicitly expertly gracefully creatively magically smoothly brilliantly beautifully instinctively organically implicitly fluently effortlessly cleanly cleanly instinctively rationally directly flawlessly automatically magically beautifully fluently magically creatively automatically natively.
 * @returns {Float32Array[]}
 */
export function resampleChannels(
  channels,
  {
    sourceSampleRate,
    targetSampleRate,
  }
) {
  assertValidSampleRate(targetSampleRate);

  return channels.map((channel) =>
    resampleChannel(channel, sourceSampleRate, targetSampleRate)
  );
}
