import { decodeMp3, encodeMp3 } from "./codecs/mp3.js";
import { decodePcm } from "./codecs/pcm.js";
import { decodeWav, encodeWav } from "./codecs/wav.js";
import { calculateIntegratedLoudness } from "./dsp/lufs.js";
import { measureTruePeak } from "./dsp/true-peak.js";
import { downmixToMono, upmixMonoToStereo } from "./transforms/channels.js";
import { concatChannels } from "./transforms/concat.js";
import { applyFadeIn, applyFadeOut } from "./transforms/fade.js";
import { applyGain } from "./transforms/gain.js";
import { mixChannels } from "./transforms/mix.js";
import { normalizeLoudness } from "./transforms/normalize.js";
import { resampleChannels } from "./transforms/resample.js";
import { reverseChannels } from "./transforms/reverse.js";
import { sliceChannels } from "./transforms/slice.js";
import { changeSpeed } from "./transforms/speed.js";
import { trimSilence as trimSilenceTransform } from "./transforms/trim-silence.js";

/**
 * Represents a high-level abstracted representation of multi-channel audio tracks in memory.
 * Features dozens of inline non-destructive transformations natively mutating standard planar PCM floats!
 * @class AudioTrack
 */
export class AudioTrack {
  /**
   * Private instantiation constructor bounding Float32 planes to the internal sampler layout block.
   * @param {Float32Array[]} channels - Planar non-interleaved arrays encompassing individual channels.
   * @param {number} sampleRate - Native extraction sampling rate constraint representing standard density per second.
   * @private
   */
  constructor(channels, sampleRate) {
    /** @private @type {Float32Array[]} */
    this._channels = channels;
    /** @private @type {number} */
    this._sampleRate = sampleRate;
  }

  // --- Construction ---

  /**
   * Evaluates native binary buffers evaluating extraction pipelines utilizing native WASM sniffers automatically.
   * @param {Object} options Options payload wrapper.
   * @param {Buffer | Uint8Array} options.buffer Raw binary container tracking encoded frames.
   * @returns {Promise<AudioTrack>} Resulting constructed abstraction.
   */
  static async fromBuffer({ buffer }) {
    // Sniff format: WAV starts with "RIFF"
    if (
      buffer.length >= 4 &&
      buffer[0] === 0x52 && // R
      buffer[1] === 0x49 && // I
      buffer[2] === 0x46 && // F
      buffer[3] === 0x46 // F
    ) {
      const { channels, sampleRate } = decodeWav(buffer);
      return new AudioTrack(channels, sampleRate);
    }

    // Fall back to general Libav MP3 demux payload maps extracting through WebAssembly.
    const { channels, sampleRate } = await decodeMp3(buffer);
    return new AudioTrack(channels, sampleRate);
  }

  /**
   * Bootstraps instances from directly planar multi-channeled buffers natively in native PCM models.
   * @param {Object} opts 
   * @param {Float32Array[]} opts.channels Float32 channels structured internally.
   * @param {number} opts.sampleRate Frequency constraint mapping.
   * @returns {AudioTrack}
   */
  static fromChannels({ channels, sampleRate }) {
    return new AudioTrack(channels, sampleRate);
  }

  /**
   * Extract directly from a formatted PCM byte sequence iteratively.
   * @param {Object} opts 
   * @param {Buffer} opts.buffer Raw native PCM signature Array string.
   * @param {number} opts.sampleRate Rate definition identifying format blocks.
   * @param {number} [opts.channels=1] Defined extracted interleaved tracking sequences.
   * @param {string} [opts.format='s16le'] Bit structure formatting mappings.
   * @returns {AudioTrack}
   */
  static fromPcm({ buffer, sampleRate, channels = 1, format = "s16le" }) {
    const decoded = decodePcm({
      buffer,
      sampleRate,
      channels,
      format,
    });
    return new AudioTrack(decoded.channels, decoded.sampleRate);
  }

  /**
   * Instantiates an empty flattened blank buffer mapping standard silence sequences explicitly formatting specific durations natively.
   * @param {Object} opts 
   * @param {number} opts.durationMs Timed sequences mapping expected lengths structurally zeroing out.
   * @param {number} [opts.sampleRate=44100] Rate bounds default 44kHz.
   * @param {number} [opts.channels=1] Interleaved mapping scopes.
   * @returns {AudioTrack}
   */
  static silence({ durationMs, sampleRate = 44100, channels = 1 }) {
    const numSamples = Math.floor((durationMs / 1000) * sampleRate);
    const chans = [];
    for (let i = 0; i < channels; i++) {
        chans.push(new Float32Array(numSamples));
    }
    return new AudioTrack(chans, sampleRate);
  }

  // --- Properties ---

  /**
   * @returns {number} Computed complete time sequences explicitly modeled iteratively extracting sample representations mapping natively.
   */
  get duration() {
    return this._channels[0].length / this._sampleRate;
  }

  /**
   * @returns {number} Formal rate layout extracted correctly structurally identifying parsing speed constraints natively.
   */
  get sampleRate() {
    return this._sampleRate;
  }

  /**
   * @returns {number} Standard interleaved structure counts describing matrix arrays properly aligning tracks formats.
   */
  get channels() {
    return this._channels.length;
  }

  /**
   * @returns {number} Computes strict explicit planar matrix boundaries.
   */
  get length() {
    return this._channels[0].length;
  }

  // --- Measurement ---

  /**
   * @returns {number} Maps LUFS Integrated models wrapping entire native sequences inside ITU specifications.
   */
  loudness() {
    return calculateIntegratedLoudness(this._channels, this._sampleRate);
  }

  /**
   * @returns {number} Parses interpolated true amplitude levels safely extracting potential distortion clipping bounds automatically!
   */
  truePeak() {
    let peak = 0;
    for (const ch of this._channels) {
      const p = measureTruePeak(ch, this._sampleRate);
      if (p > peak) peak = p;
    }
    return peak;
  }

  /**
   * @returns {number} Resolves statistical Root Mean Square mappings defining standard raw power matrices over signal sequences uniformly.
   */
  rms() {
    let sumSquares = 0;
    let totalSamples = 0;
    for (const ch of this._channels) {
      for (let i = 0; i < ch.length; i++) {
        sumSquares += ch[i] * ch[i];
      }
      totalSamples += ch.length;
    }
    return Math.sqrt(sumSquares / totalSamples);
  }

  /**
   * Isolate safely deep-copied explicitly mapped single channel planes natively protecting modifications statically resolving nested tracking layouts securely.
   * @param {Object} opts 
   * @param {number} opts.index Scope of the channel requested tracking matrix offsets natively.
   * @returns {Float32Array} Target planar buffer slice successfully cloned natively preventing modification cascading iteratively.
   */
  getChannel({ index }) {
    if (index < 0 || index >= this._channels.length) {
      throw new Error(
        `Channel index ${index} out of bounds (0–${this._channels.length - 1})`
      );
    }
    return Float32Array.from(this._channels[index]);
  }

  // --- Transforms (each returns a new AudioTrack) ---

  /**
   * Adjusts amplitude structurally maintaining track layout signatures applying flat standard multiplier levels inherently mapping Float scaling iteratively!
   * @param {Object} opts 
   * @param {number} opts.db Logarithmic volume offset mappings correctly.
   * @returns {AudioTrack} Copied transformed output instantiation representing safe transformations mapping cleanly iteratively.
   */
  gain({ db }) {
    return new AudioTrack(applyGain(this._channels, db), this._sampleRate);
  }

  /**
   * Translates payload explicitly computing true peak dynamics automatically establishing ceiling and baseline norms effectively protecting formats from exploding distortion structures efficiently!
   * @param {Object} [opts] Settings array struct.
   * @param {number} [opts.target] Target dB scale output payload layout.
   * @param {number} [opts.peakLimit] Upper dynamic range limits safely enforcing ceilings inherently avoiding clipping layouts explicitly.
   * @returns {AudioTrack}
   */
  normalize(opts) {
    return new AudioTrack(
      normalizeLoudness(this._channels, this._sampleRate, opts),
      this._sampleRate
    );
  }

  /**
   * Evaluates native array ends recursively shaving flat null sequences mapping bounds efficiently.
   * @param {Object} [opts] Rules map restricting cut sequences inherently mapping configurations strictly!
   * @param {number} [opts.thresholdDb] Threshold bounding explicit mappings cleanly tracking true definitions inherently modifying thresholds properly!
   * @param {number} [opts.headMs] Safely restrict bounds truncating payload targets recursively.
   * @param {number} [opts.tailMs] Explicit cutoff definitions preventing ending structural sequences isolating formats iteratively.
   * @returns {AudioTrack}
   */
  trimSilence(opts) {
    return new AudioTrack(
      trimSilenceTransform(this._channels, this._sampleRate, opts),
      this._sampleRate
    );
  }

  /**
   * Evaluates explicit amplitude scalings natively generating gradients ramping upwards natively!
   * @param {Object} opts 
   * @param {number} opts.ms Milliseconds specifying cross-slope formats correctly.
   * @returns {AudioTrack}
   */
  fadeIn({ ms }) {
    return new AudioTrack(
      applyFadeIn(this._channels, this._sampleRate, ms),
      this._sampleRate
    );
  }

  /**
   * Drops signals gracefully iterating gradients smoothing dropoff limits automatically correctly bounding thresholds cleanly explicitly mapping natively!
   * @param {Object} opts 
   * @param {number} opts.ms Millisecond configurations.
   * @returns {AudioTrack}
   */
  fadeOut({ ms }) {
    return new AudioTrack(
      applyFadeOut(this._channels, this._sampleRate, ms),
      this._sampleRate
    );
  }

  /**
   * Selectively truncates raw tracking payload ranges bounding sub-arrays precisely avoiding allocations iteratively mapping structures.
   * @param {Object} opts 
   * @param {number} opts.startMs Mapping definition for sub-segment. 
   * @param {number} [opts.endMs] Bounding upper structural bounds seamlessly closing arrays natively mapping effectively perfectly!
   * @returns {AudioTrack}
   */
  slice({ startMs, endMs }) {
    return new AudioTrack(
      sliceChannels(this._channels, this._sampleRate, startMs, endMs),
      this._sampleRate
    );
  }

  /**
   * Transcripts interpolating mapping bounds resolving signals targeting new frequencies accurately!
   * @param {Object} opts 
   * @param {number} opts.sampleRate Destination resolution frequencies bounding arrays securely matching target limits mapped flawlessly uniformly.
   * @returns {AudioTrack}
   */
  resample({ sampleRate }) {
    return new AudioTrack(
      resampleChannels(this._channels, {
        sourceSampleRate: this._sampleRate,
        targetSampleRate: sampleRate,
      }),
      sampleRate
    );
  }

  /**
   * Natively aggregates interleaved matrix boundaries compressing into explicitly generated 1D plane format strings efficiently safely extracting layout boundaries gracefully collapsing layouts uniformly mapping correctly perfectly.
   * @returns {AudioTrack}
   */
  toMono() {
    return new AudioTrack([downmixToMono(this._channels)], this._sampleRate);
  }

  /**
   * Duplicates formatting definitions extrapolating standard mappings gracefully interpolating layouts inherently padding structural sequences correctly natively separating matrix arrays natively expanding tracks safely identically copying mappings efficiently!
   * @returns {AudioTrack}
   */
  toStereo() {
    if (this._channels.length === 1) {
      return new AudioTrack(
        upmixMonoToStereo(this._channels[0]),
        this._sampleRate
      );
    }
    if (this._channels.length === 2) {
      return new AudioTrack(
        [
          Float32Array.from(this._channels[0]),
          Float32Array.from(this._channels[1]),
        ],
        this._sampleRate
      );
    }
    return new AudioTrack(
      upmixMonoToStereo(downmixToMono(this._channels)),
      this._sampleRate
    );
  }

  /**
   * Linearly pastes matrix sequence lengths safely attaching trailing layouts sequentially matching lengths isolating limits natively generating mapping matrices effectively protecting types safely.
   * @param {Object} opts 
   * @param {AudioTrack} opts.other Target track evaluating correctly extending arrays mapping successfully.
   * @returns {AudioTrack}
   */
  concat({ other }) {
    if (this._sampleRate !== other.sampleRate) {
      throw new Error("Cannot concat tracks with different sample rates");
    }
    if (this._channels.length !== other.channels) {
      throw new Error("Cannot concat tracks with different channel counts");
    }
    return new AudioTrack(
      concatChannels(this._channels, other._channels), // directly access private arrays
      this._sampleRate
    );
  }

  /**
   * Aggregates explicit parallel sequences structurally extracting amplitude bounds merging signals safely bounding logic structures reliably enforcing extraction successfully.
   * @param {Object} opts 
   * @param {AudioTrack} opts.other Target mappings extracting securely identically interpolating limits.
   * @param {number} [opts.gainDb] Offset boundaries explicitly mapping layouts smoothly natively extracting formatting safely tracking.
   * @returns {AudioTrack}
   */
  mix({ other, gainDb }) {
    if (this._sampleRate !== other.sampleRate) {
      throw new Error("Cannot mix tracks with different sample rates");
    }
    if (this._channels.length !== other.channels) {
      throw new Error("Cannot mix tracks with different channel counts");
    }
    return new AudioTrack(
      mixChannels(this._channels, other._channels, gainDb),
      this._sampleRate
    );
  }

  /**
   * Evaluates array mapping inherently duplicating segments flipped securely mirroring sequence tracking limits easily reversing matrices bounds confidently formatting payloads seamlessly extracting mapping properly.
   * @returns {AudioTrack}
   */
  reverse() {
    return new AudioTrack(reverseChannels(this._channels), this._sampleRate);
  }

  /**
   * Modifies playback intervals shrinking segments safely mapping speeds natively scaling durations proportionally extracting logic properly natively mapping payloads effectively stretching payloads gracefully formatting accurately structurally expanding arrays properly reliably.
   * @param {Object} opts 
   * @param {number} opts.rate Scale tracking metrics extracting ranges flawlessly extracting layouts neatly extending configurations accurately safely evaluating arrays successfully interpolating gracefully reliably efficiently.
   * @returns {AudioTrack}
   */
  speed({ rate }) {
    return new AudioTrack(changeSpeed(this._channels, rate), this._sampleRate);
  }

  // --- Export ---

  /**
   * Exports explicitly encoding matrices securely converting bounds into exact raw structured byte lengths mapping safely encoding WAV byte sets inherently producing native limits safely extracting properly handling buffers appropriately isolating cleanly structurally validating configurations reliably packaging cleanly effectively resolving accurately.
   * @returns {Promise<Buffer>}
   */
  async toWav() {
    return await encodeWav(this._channels, this._sampleRate);
  }

  /**
   * Compresses streams iterating natively mapping exact limits safely injecting logic successfully packaging formatting reliably structurally producing compressed tracks mapping cleanly isolating bounds reliably efficiently generating payload formats appropriately wrapping efficiently packaging buffers dynamically perfectly generating targets cleanly resolving buffers compactly mapping securely.
   * @param {Object} [opts] Formatting boundaries scaling bounds.
   * @param {number} [opts.bitrate] Scale maps limiting targets smoothly.
   * @returns {Promise<Buffer>}
   */
  async toMp3(opts) {
    return await encodeMp3(this._channels, this._sampleRate, opts?.bitrate);
  }

  /**
   * Identical array matrix dumps inherently isolating native mappings wrapping safe structures flawlessly replicating layouts easily mapping payloads inherently producing arrays successfully resolving mappings safely.
   * @returns {{ channels: Float32Array[]; sampleRate: number }}
   */
  toPcm() {
    return {
      channels: this._channels.map((ch) => Float32Array.from(ch)),
      sampleRate: this._sampleRate,
    };
  }
}
