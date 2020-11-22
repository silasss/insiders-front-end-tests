import { alreadyExistsIn, alreadyExistsInWithBlackListAsync } from "./array"

describe('Array utils', () => {

  describe('alreadyExistsIn', () => {
    
    it('should have been called with two parameters', () => {
      expect(alreadyExistsIn).toThrowError(/must have two parameters/)
    })
    
    it('should receive an array as a second parameter', () => {
      expect(() => alreadyExistsIn('', '')).toThrowError(/second parameter must be an Array/)
    })
    
    it('shouldn\'t find a item in array', () => {
      expect(alreadyExistsIn('Test', ['ReactJS', 'NodeJS'])).toBe(false)
    })
    
    it('should find a item in array', () => {
      expect(alreadyExistsIn('ReactJS', ['ReactJS', 'NodeJS'])).toBe(true)
    })
  })

  describe('alreadyExistsInWithBlackListAsync', () => {
    
    it('should have been called with two parameters', async () => {
      await expect(alreadyExistsInWithBlackListAsync)
        .rejects
        .toThrowError(/must have two parameters/)
    })
    
    it('should receive an array as a second parameter', async () => {
      await expect(() => alreadyExistsInWithBlackListAsync('', ''))
        .rejects
        .toThrowError(/second parameter must be an Array/)
    })
    
    it('should find a item in array', async () => {
      await expect(alreadyExistsInWithBlackListAsync('ReactJS', ['ReactJS', 'NodeJS']))
        .resolves
        .toBe(true)
    })
    
    it('should find a item in array - async', async () => {
      const result = await alreadyExistsInWithBlackListAsync('ReactJS', ['ReactJS', 'NodeJS'])
      expect(result).toBe(true)
    })
    
    it('shouldn\'t find a item in array', done => {
      alreadyExistsInWithBlackListAsync('Test', ['ReactJS', 'NodeJS'])
        .then(result => {
          expect(result).toBe(false)
          done()
        })
    })
  })
})