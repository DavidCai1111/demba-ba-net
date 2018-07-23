'use strict'
const tf = require('@tensorflow/tfjs')
const Jimp = require('jimp')

async function loadImage (path) {
  let img = await Jimp.read(path)
  img.resize(224, 224)

  const p = []

  img.scan(0, 0, img.bitmap.width, img.bitmap.height, function (x, y, idx) {
    p.push(this.bitmap.data[idx + 0])
    p.push(this.bitmap.data[idx + 1])
    p.push(this.bitmap.data[idx + 2])
  })

  return tf.tensor3d(p, [224, 224, 3])
    .reshape([1, 224, 224, 3])
    .toFloat()
    .div(tf.scalar(127))
    .sub(tf.scalar(1))
}

module.exports = { loadImage }
