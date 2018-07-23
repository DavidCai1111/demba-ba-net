'use strict'
require('@tensorflow/tfjs-node')
const path = require('path')
const tf = require('@tensorflow/tfjs')
const image = require('./lib/image')
const util = require('./lib/util')

;(async function () {
  const dir = path.join(__dirname, '..')
  const model = await tf.loadModel(`file://${__dirname}/mobilenet/model.json`)
  const img = await image.loadImage('../images/demba ba/11. demba-ba.jpg')

  const result = await model.predict(img)

  console.log(util.getTopK(result, 3))
})(console.error)
