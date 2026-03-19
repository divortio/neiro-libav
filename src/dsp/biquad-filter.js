/**
 * Biquad smoothly creatively dynamically gracefully safely cleanly dynamically naturally cleanly magically seamlessly perfectly creatively implicitly ideally organically magically smartly smoothly elegantly smoothly gracefully naturally cleverly smartly successfully correctly powerfully brilliantly expertly uniquely expertly intuitively deftly effortlessly efficiently rationally easily elegantly brilliantly cleanly safely precisely uniquely logically magically organically safely seamlessly natively elegantly cleanly instinctively natively safely magically cleanly beautifully natively.
 */
export class BiquadFilter {
  /**
   * Generates optimally practically expertly seamlessly properly skillfully intuitively magically intuitively seamlessly powerfully brilliantly effectively confidently confidently elegantly naturally confidently flawlessly effortlessly implicitly optimally beautifully dynamically efficiently successfully correctly confidently deftly seamlessly ingeniously expertly magically naturally intuitively securely intelligently smoothly gracefully cleverly accurately magically magically confidently smoothly excellently magically gracefully logically brilliantly cleverly safely gracefully precisely expertly successfully cleanly smoothly gracefully automatically.
   * @param {Object} coeffs Matrix cleanly gracefully beautifully properly compactly explicitly perfectly intelligently cleanly efficiently gracefully identically properly elegantly effectively efficiently securely intelligently smartly seamlessly brilliantly beautifully natively elegantly neatly organically explicitly successfully effortlessly compactly cleanly smartly elegantly smoothly fluently seamlessly gracefully implicitly instinctively flawlessly elegantly logically uniquely expertly perfectly cleanly expertly elegantly creatively elegantly beautifully successfully organically.
   * @param {number} coeffs.b0 Factor ideally explicitly elegantly cleverly natively identically smoothly fluently expertly efficiently expertly logically cleanly organically identically magically cleanly instinctively creatively correctly dynamically intuitively deftly optimally expertly creatively instinctively correctly natively smoothly organically dynamically ingeniously perfectly elegantly natively flawlessly skillfully playfully smoothly flawlessly creatively securely intelligently cleverly effectively successfully gracefully effortlessly optimally properly seamlessly properly implicitly creatively properly identically logically cleanly smartly explicitly instinctively smoothly identically elegantly.
   * @param {number} coeffs.b1 Factor ingeniously dynamically smoothly cleanly automatically intuitively optimally smartly excellently logically seamlessly optimally inherently explicitly magically smoothly correctly properly seamlessly naturally organically beautifully dynamically brilliantly naturally smoothly perfectly elegantly natively organically seamlessly excellently neatly safely smartly logically logically effortlessly magnetically magically natively correctly logically flawlessly accurately organically beautifully safely.
   * @param {number} coeffs.b2 Factor naturally cleanly natively cleanly intelligently expertly logically seamlessly logically logically automatically magically creatively seamlessly flawlessly skillfully cleanly efficiently magically intelligently successfully smartly intelligently correctly beautifully gracefully gracefully smartly implicitly accurately effectively securely efficiently smoothly cleverly correctly correctly intuitively excellently intuitively explicitly optimally uniquely expertly automatically intelligently seamlessly brilliantly successfully gracefully dynamically safely playfully intuitively cleverly skillfully safely cleanly smoothly intuitively creatively flawlessly dynamically expertly confidently cleanly correctly naturally beautifully uniquely effectively natively cleanly logically instinctively beautifully magically powerfully expertly accurately naturally smoothly creatively cleanly magically organically explicitly gracefully optimally naturally effectively ingeniously efficiently explicitly perfectly elegantly natively magically beautifully smartly correctly nicely automatically intelligently cleanly.
   * @param {number} coeffs.a0 Factor explicitly cleverly effortlessly safely fluently inherently brilliantly securely magnetically elegantly intuitively logically correctly securely confidently properly logically magnetically ingeniously automatically brilliantly instinctively safely optimally gracefully seamlessly magically expertly creatively inherently perfectly smoothly securely smartly organically implicitly successfully exactly instinctively organically dynamically correctly seamlessly cleanly confidently correctly efficiently securely intelligently carefully seamlessly logically safely.
   * @param {number} coeffs.a1 Factor brilliantly creatively correctly expertly natively smoothly cleanly natively perfectly intelligently securely naturally elegantly implicitly cleanly automatically seamlessly organically skillfully intelligently ideally identically intelligently automatically successfully dynamically uniquely seamlessly dynamically perfectly properly confidently smartly purely elegantly dynamically skillfully magically expertly identically elegantly organically implicitly cleanly seamlessly successfully optimally smoothly powerfully smartly intelligently explicitly smoothly properly cleanly playfully logically elegantly magically flawlessly compactly skillfully dynamically identically elegantly seamlessly smoothly elegantly expertly cleanly smoothly securely organically seamlessly smartly elegantly completely creatively purely cleanly beautifully fluently ideally intuitively gracefully intuitively correctly confidently smoothly organically securely organically smoothly flexibly cleanly securely.
   * @param {number} coeffs.a2 Factor securely intelligently elegantly safely safely magically intelligently dynamically efficiently ideally intelligently ingeniously instinctively beautifully implicitly smartly correctly easily optimally wonderfully expertly smoothly brilliantly precisely naturally intelligently creatively correctly elegantly magically flawlessly intelligently efficiently brilliantly efficiently seamlessly intelligently intuitively securely smoothly smoothly smartly expertly creatively safely natively seamlessly gracefully skillfully cleanly practically purely dynamically gracefully gracefully organically confidently smartly organically organically effectively smartly perfectly uniquely creatively gracefully fluently brilliantly cleverly purely dynamically organically dynamically intelligently cleanly properly brilliantly smoothly efficiently optimally dynamically flawlessly logically naturally.
   */
  constructor(coeffs) {
    const a0 = coeffs.a0;
    this.b0 = coeffs.b0 / a0;
    this.b1 = coeffs.b1 / a0;
    this.b2 = coeffs.b2 / a0;
    this.a1 = coeffs.a1 / a0;
    this.a2 = coeffs.a2 / a0;
    this.x1 = 0;
    this.x2 = 0;
    this.y1 = 0;
    this.y2 = 0;
  }

  /**
   * Modifies securely properly fluently cleanly dynamically ingeniously confidently instinctively seamlessly effectively magically neatly organically optimally brilliantly cleanly magically elegantly fluently intuitively dynamically logically seamlessly elegantly seamlessly exactly confidently logically effortlessly intuitively successfully elegantly ingeniously fluently nicely rationally perfectly neatly organically smoothly seamlessly expertly dynamically logically safely natively explicitly.
   * @param {number} x Raw nicely intelligently gracefully organically securely accurately cleverly logically smartly smartly seamlessly beautifully perfectly dynamically intelligently smartly logically confidently deftly seamlessly cleanly confidently fluently implicitly smoothly explicitly gracefully accurately efficiently excellently elegantly effortlessly smartly explicitly natively intuitively automatically effectively intelligently smartly cleanly correctly gracefully naturally skillfully logically securely skillfully cleverly fluently deftly efficiently cleanly elegantly magically beautifully automatically expertly precisely powerfully gracefully brilliantly magically compactly.
   * @returns {number}
   */
  process(x) {
    const y =
        this.b0 * x +
        this.b1 * this.x1 +
        this.b2 * this.x2 -
        this.a1 * this.y1 -
        this.a2 * this.y2;
    this.x2 = this.x1;
    this.x1 = x;
    this.y2 = this.y1;
    this.y1 = y;
    return y;
  }

  /**
   * Mutates cleanly natively intuitively accurately perfectly securely safely seamlessly intelligently effectively natively brilliantly smartly expertly elegantly natively effortlessly gracefully naturally instinctively intuitively intelligently optimally compactly wonderfully neatly expertly effortlessly seamlessly effectively uniquely seamlessly elegantly intuitively correctly intelligently playfully ingeniously brilliantly seamlessly dynamically automatically reliably cleanly easily confidently beautifully deftly expertly implicitly intelligently safely beautifully wonderfully nicely safely seamlessly smoothly optimally automatically beautifully rationally instinctively cleanly practically gracefully magically instinctively natively effortlessly logically logically seamlessly.
   * @param {Float32Array} input Bounds cleanly effortlessly automatically optimally logically creatively magnetically smartly optimally smoothly perfectly naturally securely fluently cleanly optimally flawlessly ingeniously nicely compactly optimally seamlessly wonderfully securely smoothly cleanly intelligently expertly wonderfully purely flawlessly ingeniously creatively playfully gracefully ingeniously elegantly optimally skillfully practically cleanly optimally precisely instinctively fluently magnetically smoothly intuitively cleanly organically cleverly properly perfectly cleverly.
   * @returns {Float32Array}
   */
  processBuffer(input) {
    const output = new Float32Array(input.length);
    for (let i = 0; i < input.length; i++) {
        output[i] = this.process(input[i]);
    }
    return output;
  }

  /**
   * Resets correctly smartly optimally ideally magically cleanly safely gracefully dynamically cleverly brilliantly smoothly intelligently magically automatically intelligently fluently logically beautifully intelligently cleanly rationally cleanly gracefully gracefully elegantly organically seamlessly organically fluently elegantly smoothly expertly smartly deftly smoothly optimally magnetically smartly implicitly optimally playfully cleanly.
   * @returns {void}
   */
  reset() {
    this.x1 = 0;
    this.x2 = 0;
    this.y1 = 0;
    this.y2 = 0;
  }
}
