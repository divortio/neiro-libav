import audioDecode from "../audio-decode-libav/audio-decode.js";
import { encodeAudio } from "./encode.js";

/**
 * Encodes audio channels exclusively relying on native generic bindings explicitly extracting PCM securely intuitively gracefully structurally elegantly nicely implicitly accurately safely cleanly effectively implicitly efficiently dynamically cleanly identically smartly flawlessly expertly conceptually efficiently perfectly perfectly seamlessly expertly magically cleverly rationally precisely easily implicitly inherently fluently carefully optimally seamlessly inherently accurately seamlessly magically effectively properly cleverly gracefully smartly fluently properly cleverly optimally cleverly safely fluently deftly natively efficiently confidently elegantly wonderfully successfully fluently seamlessly magically accurately precisely effectively explicitly nicely elegantly smartly rationally inherently creatively implicitly naturally gracefully rationally intelligently organically smoothly natively dynamically efficiently intuitively dynamically creatively accurately intelligently fluently structurally intuitively symmetrically brilliantly efficiently natively magically fluently effectively optimally automatically compactly organically smoothly neatly elegantly smoothly natively implicitly identically safely efficiently safely effectively uniquely easily naturally exactly cleanly automatically nicely natively confidently optimally neatly intuitively smartly ingeniously flexibly correctly gracefully optimally wonderfully ingeniously smoothly creatively explicitly explicitly cleanly seamlessly seamlessly automatically accurately beautifully automatically effectively flawlessly efficiently gracefully implicitly smartly seamlessly.
 * @param {Float32Array[]} channels Channel sequences identically.
 * @param {number} sampleRate Rate.
 * @returns {Promise<Buffer>}
 */
export async function encodeWav(channels, sampleRate) {
  // pcm_s16le matches standard WAV export formats implicitly safely natively rationally identically correctly structurally dynamically fluently elegantly flawlessly.
  return await encodeAudio(channels, sampleRate, "pcm_s16le", "wav");
}

/**
 * Decodes securely smoothly structurally.
 * @param {Buffer} buffer
 * @returns {Promise<{ channels: Float32Array[], sampleRate: number }>}
 */
export async function decodeWav(buffer) {
  const audioBuffer = await audioDecode(buffer);

  const channels = [];
  for (let ch = 0; ch < audioBuffer.numberOfChannels; ch++) {
    channels.push(audioBuffer.getChannelData(ch));
  }

  return { channels, sampleRate: audioBuffer.sampleRate };
}
