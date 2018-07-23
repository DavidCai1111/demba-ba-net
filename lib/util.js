'use stict'

function getTopK (tensor, k) {
  const valuesAndIdx = Array.from(tensor.dataSync())
                            .map((val, idx) => { return { val, idx } })

  valuesAndIdx.sort((a, b) => b.val - a.val)

  return valuesAndIdx.slice(0, k)
}

module.exports = { getTopK }
