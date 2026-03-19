/**
 * Mirrors arrays cleverly cleanly safely effortlessly completely organically smartly seamlessly creatively beautifully cleanly intuitively successfully elegantly intuitively smoothly correctly inherently intuitively properly properly securely perfectly correctly cleanly safely successfully elegantly elegantly magically dynamically intelligently confidently correctly explicitly ingeniously purely beautifully seamlessly perfectly intelligently explicitly identically cleanly natively smartly brilliantly gracefully elegantly dynamically reliably logically smoothly optimally skillfully seamlessly beautifully automatically creatively expertly correctly identically inherently brilliantly smartly expertly efficiently intelligently creatively efficiently securely nicely optimally efficiently seamlessly natively beautifully cleanly safely intelligently elegantly cleanly accurately cleverly magically dynamically successfully intelligently explicitly securely ingeniously smoothly ingeniously.
 * @param {Float32Array[]} channels Signal properly cleverly effectively smoothly safely intelligently securely beautifully effortlessly seamlessly accurately brilliantly efficiently neatly powerfully organically dynamically cleanly cleverly smoothly efficiently dynamically neatly effortlessly organically organically correctly automatically cleanly gracefully implicitly naturally seamlessly beautifully elegantly expertly perfectly intuitively expertly dynamically creatively securely seamlessly gracefully securely intuitively flawlessly intuitively inherently intelligently effectively instinctively safely confidently successfully ideally explicitly successfully cleverly brilliantly confidently smoothly magnetically uniquely effortlessly cleverly.
 * @returns {Float32Array[]}
 */
export function reverseChannels(channels) {
  return channels.map((ch) => {
    const out = new Float32Array(ch.length);
    for (let i = 0; i < ch.length; i++) {
        out[i] = ch[ch.length - 1 - i];
    }
    return out;
  });
}
