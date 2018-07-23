'use strict'
require('@tensorflow/tfjs-node')
const tf = require('@tensorflow/tfjs')
const image = require('./lib/image')
const { loadMobileNet, dembaBaNetModel } = require('./lib/model')

;(async function () {
  const mobileNet = await loadMobileNet()
  const img = await image.loadImage('../images/demba ba/demba-ba-65.jpg')

  const model = dembaBaNetModel

  const optimizer = tf.train.adam(0.0001)
  model.compile({ optimizer, loss: 'categoricalCrossentropy' })

  const result = await mobileNet.predict(img)

  console.log(result)
})(console.error)
