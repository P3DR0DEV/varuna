import { makeMobile } from 'test/factories/make-mobile'
import { InMemoryMobileRepository } from 'test/repositories/in-memory-mobile-repository'

import { GetMobileByTagUseCase } from '../get-mobile-by-tag'

let sut: GetMobileByTagUseCase
let mobileRepository: InMemoryMobileRepository

describe('Get mobile by tag', () => {
  beforeEach(() => {
    mobileRepository = new InMemoryMobileRepository()
    sut = new GetMobileByTagUseCase(mobileRepository)

    const mobile = makeMobile({
      tag: '010203',
    })

    mobileRepository.create(mobile)
  })

  it('should be able to get mobile by tag', async () => {
    const result = await sut.execute({
      tag: '010203',
    })

    expect(result.isSuccess()).toBe(true)

    if (result.isSuccess()) {
      const { mobile } = result.value

      expect(mobile.tag).toEqual('010203')
    }
  })

  it('should return a not found error if mobile not found', async () => {
    const result = await sut.execute({
      tag: '010204',
    })

    expect(result.isFailure()).toBe(true)

    if (result.isFailure()) {
      const { name } = result.reason

      expect(name).toEqual('NotFoundError')
    }
  })

  it('should return a bad request error if tag is not provided', async () => {
    const result = await sut.execute({
      tag: '',
    })

    expect(result.isFailure()).toBe(true)

    if (result.isFailure()) {
      const { name } = result.reason

      expect(name).toEqual('BadRequestError')
    }
  })
})
