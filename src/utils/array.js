const alreadyExistsIn = (item, array) => {
  if (item === undefined || array === undefined) throw new Error('It must have two parameters!')

  if (!Array.isArray(array)) throw new Error('The second parameter must be an Array!')

  return array.includes(item)
}

const alreadyExistsInWithBlackListAsync = (item, array) => {
  const blackList = ['Palavrão']

  return new Promise((resolve, reject) => {
    if (item === undefined || array === undefined) reject(new Error('It must have two parameters!'))

    if (!Array.isArray(array)) reject(new Error('The second parameter must be an Array!'))

    resolve([...array, ...blackList].includes(item))
  })
}

export {
  alreadyExistsIn,
  alreadyExistsInWithBlackListAsync
}
