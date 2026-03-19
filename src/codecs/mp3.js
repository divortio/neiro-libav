import audioDecode from "../audio-decode-libav/audio-decode.js"; // Point to our bridged FFmpeg version!
import { encodeAudio } from "./encode.js";

/**
 * Encodes raw matrix float layouts explicitly tracking bounds translating signals safely isolating arrays into native MP3 distributions natively via LibAV.
 * @param {Float32Array[]} channels Channel sequences arrays tracking natively properly.
 * @param {number} sampleRate Interpolation sizes defining frequency tracking sizes bounds natively limits seamlessly bounding.
 * @param {number} [bitrate=128] MP3 compression boundary sizing constraint scale limits. Note: encodeAudio currently fixes at 128k but can be extended.
 * @returns {Promise<Buffer>}
 */
export async function encodeMp3(
  channels,
  sampleRate,
  bitrate = 128
) {
  // We delegate to our generic libav.js mapping!
  return await encodeAudio(channels, sampleRate, "libmp3lame", "mp3");
}

/**
 * Exits MP3 compression arrays mapping scopes bounding variables identically structurally formatting payloads effectively accurately targeting decoding sizes tracking securely.
 * @param {Buffer} buffer Native structure byte stream maps tracking frames effectively.
 * @returns {Promise<{ channels: Float32Array[], sampleRate: number }>}
 */
export async function decodeMp3(buffer) {
  const audioBuffer = await audioDecode(buffer);

  const channels = [];
  for (let ch = 0; ch < audioBuffer.numberOfChannels; ch++) {
    channels.push(audioBuffer.getChannelData(ch));
  }

  return { channels, sampleRate: audioBuffer.sampleRate };
}
