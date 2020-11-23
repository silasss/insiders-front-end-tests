import { alreadyExistsIn, alreadyExistsInWithBlackListAsync } from "./array"

describe('Array utils', () => {

  describe('Função alreadyExistsIn', () => {
    
    it('Deve ser chamado com dois parâmetros', () => {
      expect(alreadyExistsIn).toThrowError(/Deve ter dois parâmetros/)
    })
    
    it('Deve receber um array no segundo parâmetro', () => {
      expect(() => alreadyExistsIn('', '')).toThrowError(/segundo parâmetro precisa ser um Array/)
    })
    
    it('Deve retornar falso quando não existir no array', () => {
      expect(alreadyExistsIn('Test', ['ReactJS', 'NodeJS'])).toBe(false)
    })
    
    it('Deve retornar true quando existir no array', () => {
      expect(alreadyExistsIn('ReactJS', ['ReactJS', 'NodeJS'])).toBe(true)
    })
  })

  describe('Função Promise alreadyExistsInWithBlackListAsync', () => {
    
    it('Deve ser chamado com dois parâmetros', async () => {
      await expect(alreadyExistsInWithBlackListAsync)
        .rejects
        .toThrowError(/Deve ter dois parâmetros/)
    })
    
    it('Deve receber um array no segundo parâmetro', async () => {
      await expect(() => alreadyExistsInWithBlackListAsync('', ''))
        .rejects
        .toThrowError(/segundo parâmetro precisa ser um Array/)
    })
    
    it('Deve retornar true quando existir no array', async () => {
      await expect(alreadyExistsInWithBlackListAsync('ReactJS', ['ReactJS', 'NodeJS']))
        .resolves
        .toBe(true)
    })
    
    it('Deve retornar true quando existir no array - 2', async () => {
      const result = await alreadyExistsInWithBlackListAsync('ReactJS', ['ReactJS', 'NodeJS'])
      expect(result).toBe(true)
    })
    
    it('Deve retornar falso quando não existir no array', done => {
      alreadyExistsInWithBlackListAsync('Test', ['ReactJS', 'NodeJS'])
        .then(result => {
          expect(result).toBe(false)
          done()
        })
    })
  })
})