'use stict'

function getTopK (tensor, k) {
  const valuesAndIdx = Array.from(tensor.dataSync()).map(function (val, idx) {
    return { val, idx }
  })

  valuesAndIdx.sort((a, b) => {
    return b.val - a.val;
  })

  return valuesAndIdx.slice(0, k)
}

module.exports = { getTopK }
