'use strict'
require('@tensorflow/tfjs-node-gpu')
const tf = require('@tensorflow/tfjs')
const glob = require('glob')
const shuffle = require('shuffle-array')
const { dembaBaNetModel, loadMobileNet } = require('./model')
const image = require('./image')

const imgs = shuffle(glob.sync('../images/demba ba/*'))

const optimizer = tf.train.sgd(0.0001)
dembaBaNetModel.compile({ optimizer, loss: 'binaryCrossentropy' })

;(async function () {
  console.log('Start loading dataset...')
  const mobileNet = await loadMobileNet()

  let xs = await Promise.all(imgs.map((imgPath) => image.loadImage(imgPath)))
  xs = await Promise.all(xs.map((x) => mobileNet.predict(x)))
  xs = xs.map((x) => x.reshape([7, 7, 1024]))

  let ys = []
  for (const imgPath of imgs) {
    let y = 0
    if (imgPath.includes('demba-ba-')) y = 1

    ys.push([y])
  }

  console.log({ xs: tf.stack(xs), ys: tf.tensor2d(ys) })

  console.log('Start traning...')

  await dembaBaNetModel.fit(tf.stack(xs), tf.tensor2d(ys), {
    epochs: 2000,
    callbacks: {
      onBatchEnd: async function (batch, logs) {
        console.log('[Training] Cost: ' + logs.loss.toFixed(5))
        await tf.nextFrame()
      }
    }
  })

  console.log('Start saving model...')
  dembaBaNetModel.save(`file://${__dirname}/dbb`)

  console.log('Done!')
})(console.error)
