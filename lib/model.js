'use strict'
const path = require('path')
const tf = require('@tensorflow/tfjs')

const dembaBaNetModel = tf.sequential()

dembaBaNetModel.add(tf.layers.flatten({ inputShape: [7, 7, 1024] }))

dembaBaNetModel.add(tf.layers.dense({
  units: 128,
  activation: 'relu',
  kernelInitializer: 'varianceScaling',
  useBias: true
}))

dembaBaNetModel.add(tf.layers.dense({
  units: 1,
  activation: 'sigmoid'
}))

async function loadMobileNet () {
  const model = await tf.loadModel(`file://${path.join(__dirname, '..')}/mobilenet/model.json`)

  return tf.model({
    inputs: model.inputs,
    outputs: model.getLayer('conv_pw_13_relu').output
  })
}

module.exports = { loadMobileNet, dembaBaNetModel }
