'use strict'
require('@tensorflow/tfjs-node')
const tf = require('@tensorflow/tfjs')
const image = require('./lib/image')
const { loadMobileNet } = require('./lib/model')

;(async function () {
  const mobileNet = await loadMobileNet()
  const model = await tf.loadModel(`file://${__dirname}/demba-ba-net/model.json`)
  const img = await image.loadImage('../images/demba ba/11. neymar.jpg')

  const activation = mobileNet.predict(img)

  console.log(activation)

  const result = await model.predict(activation)

  console.log(result.dataSync())
})(console.error)
