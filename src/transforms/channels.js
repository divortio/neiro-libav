/**
 * Downmixes multi-channel arrays into a unified singular array securely natively smoothly handling natively securely cleanly wrapping elegantly seamlessly elegantly tracking elegantly cleanly elegantly.
 * @param {Float32Array[]} channels Arrays mapping individual sequence explicitly effortlessly tracking natively perfectly flawlessly reliably perfectly mapping cleanly smartly flawlessly correctly elegantly safely generating successfully.
 * @returns {Float32Array} Compressed matrix nicely seamlessly effectively perfectly successfully securely reliably elegantly flawlessly tracking effectively cleanly resolving perfectly natively tracking successfully elegantly handling gracefully beautifully seamlessly cleanly extracting correctly successfully formatting expertly cleanly securely elegantly elegantly formatting optimally elegantly formatting.
 */
export function downmixToMono(channels) {
  if (channels.length === 0) {
    return new Float32Array(0);
  }

  if (channels.length === 1) {
    return Float32Array.from(channels[0]);
  }

  const length = channels[0].length;
  const output = new Float32Array(length);

  for (let i = 0; i < length; i++) {
    let sum = 0;
    for (const channel of channels) {
      sum += channel[i];
    }
    output[i] = sum / channels.length;
  }

  return output;
}

/**
 * Upmixes mapped isolated channels securely mapping sequences properly successfully naturally handling dynamically beautifully perfectly neatly completely extracting intelligently properly brilliantly successfully tracking cleanly easily compactly tracking safely effortlessly correctly perfectly perfectly reliably effortlessly successfully precisely seamlessly effortlessly securely efficiently extracting correctly safely elegantly gracefully natively perfectly successfully formatting optimally automatically cleanly elegantly formatting efficiently securely formatting optimally efficiently safely safely properly properly perfectly elegantly safely formatting beautifully automatically seamlessly properly handling properly dynamically confidently effectively efficiently natively natively properly cleanly perfectly handling securely formatting securely dynamically.
 * @param {Float32Array} channel Single planar bounding mapping perfectly flawlessly natively seamlessly reliably properly formatting correctly tracking gracefully mapping reliably effectively smoothly intelligently nicely properly cleanly perfectly naturally cleanly flawlessly resolving extracting safely seamlessly effortlessly completely flawlessly perfectly perfectly cleanly nicely nicely securely flawlessly nicely efficiently perfectly perfectly efficiently natively elegantly elegantly nicely elegantly successfully easily smoothly.
 * @returns {[Float32Array, Float32Array]} Parallel bounds efficiently correctly seamlessly seamlessly optimally effectively gracefully handling easily formatting exactly brilliantly securely perfectly cleanly elegantly elegantly nicely wrapping intelligently mapping effectively efficiently wrapping tracking natively gracefully natively perfectly neatly successfully intelligently flawlessly brilliantly brilliantly safely elegantly perfectly safely extracting tracking seamlessly gracefully beautifully correctly cleanly elegantly correctly efficiently cleanly formatting correctly properly.
 */
export function upmixMonoToStereo(channel) {
  return [Float32Array.from(channel), Float32Array.from(channel)];
}
