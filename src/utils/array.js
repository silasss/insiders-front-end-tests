const alreadyExistsIn = (item, array) => {
  if (item === undefined || array === undefined) throw new Error('Deve ter dois parâmetros!')

  if (!Array.isArray(array)) throw new Error('O segundo parâmetro precisa ser um Array!')

  return array.includes(item)
}

const alreadyExistsInWithBlackListAsync = (item, array) => {
  const blackList = ['Palavrão']

  return new Promise((resolve, reject) => {
    if (item === undefined || array === undefined) reject(new Error('Deve ter dois parâmetros!'))

    if (!Array.isArray(array)) reject(new Error('O segundo parâmetro precisa ser um Array!'))

    resolve([...array, ...blackList].includes(item))
  })
}

export {
  alreadyExistsIn,
  alreadyExistsInWithBlackListAsync
}
