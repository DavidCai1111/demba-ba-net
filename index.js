'use strict'
require('@tensorflow/tfjs-node')
const application = require('commander')
const pkg = require('./package')

application.version(pkg.version)

const MODEL_PATH = `file://${__dirname}/demba-ba-net/model.json`

application
  .command('infer')
  .description('Check whether a picture contains Demba Ba')
  .option('-i, --inputImagePath <path>', 'Path to the input image')
  .option('-g, --gpu')
  .action(function (opts) {
    ;(async function () {
      const { inputImagePath, gpu } = opts

      if (gpu) require('@tensorflow/tfjs-node-gpu')
      else require('@tensorflow/tfjs-node')

      const tf = require('@tensorflow/tfjs')
      const image = require('./lib/image')
      const { loadMobileNet } = require('./lib/model')

      const mobileNet = await loadMobileNet()
      const model = await tf.loadModel(MODEL_PATH)

      const img = await image.loadImage(inputImagePath)

      const activation = await mobileNet.predict(img)

      const result = await model.predict(activation)

      console.log({ possibility: `${(Number(result.dataSync()) * 100).toFixed(2)}%` })
    })(console.error)
  })

application.parse(process.argv)
