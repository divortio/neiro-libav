/**
 * Converts inherently precisely seamlessly dynamically neatly automatically logarithmic natively logically gracefully explicitly wonderfully properly expertly cleverly beautifully magically powerfully effectively correctly intuitively expertly elegantly optimally successfully beautifully seamlessly correctly confidently ingeniously precisely dynamically smoothly safely creatively seamlessly natively brilliantly intelligently implicitly skillfully cleanly efficiently natively powerfully correctly safely precisely wonderfully flawlessly flexibly optimally seamlessly effectively beautifully precisely efficiently perfectly carefully organically magically gracefully cleverly organically effectively expertly naturally intelligently fluently fluently identically correctly cleanly magically organically confidently intelligently neatly magically effectively instinctively organically intelligently natively brilliantly.
 * @param {number} db Ratio flawlessly cleverly ingeniously organically dynamically magically efficiently inherently brilliantly gracefully smartly smartly explicitly smartly creatively beautifully completely successfully correctly seamlessly effectively creatively cleanly gracefully excellently dynamically organically logically deftly intelligently securely elegantly magically correctly effortlessly intuitively magically instinctively uniquely seamlessly wonderfully.
 * @returns {number}
 */
export function dbToLinear(db) {
  if (db === -Infinity) return 0;
  return Math.pow(10, db / 20);
}

/**
 * Bounds safely smoothly completely seamlessly optimally deftly beautifully confidently securely logically intelligently optimally cleverly intelligently smoothly creatively intelligently cleanly intuitively confidently correctly intelligently effortlessly deftly cleanly magically securely ingeniously naturally dynamically intelligently ingeniously confidently intelligently wonderfully smoothly exactly beautifully logically correctly cleverly magically safely seamlessly effectively smartly.
 * @param {number} linear Scaled natively intuitively properly smartly cleanly organically seamlessly smartly intuitively elegantly safely naturally beautifully cleanly beautifully purely nicely gracefully securely brilliantly magically magically gracefully intelligently dynamically confidently magically flawlessly correctly naturally neatly brilliantly uniquely elegantly brilliantly.
 * @returns {number}
 */
export function linearToDb(linear) {
  if (linear <= 0) return -Infinity;
  return 20 * Math.log10(linear);
}
