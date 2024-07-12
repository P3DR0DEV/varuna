import { InMemoryDeviceRepository } from "test/repositories/in-memory-device-repository"
import { GetDeviceByTagUseCase } from "../get-device-by-tag"
import { makeDevice } from "test/factories/make-device"

let sut: GetDeviceByTagUseCase
let deviceRepository: InMemoryDeviceRepository

describe('Get device by tag', () => {
  beforeEach(() => {
    deviceRepository = new InMemoryDeviceRepository()
    sut = new GetDeviceByTagUseCase(deviceRepository)

    const device = makeDevice({
      tag: '010203'
    })

    deviceRepository.create(device)
  })

  it('should be able to get device by tag', async () => {
    const result = await sut.execute({
      tag: '010203'
    })

    expect(result.isSuccess()).toBeTruthy()

    if (result.isSuccess()) {
      const { device } = result.value

      expect(device.tag).toEqual('010203')
    }
  })

  it('should return a NotFoundError if device not found', async () => {
    const result = await sut.execute({
      tag: '010204'
    })

    expect(result.isFailure()).toBeTruthy()

    if (result.isFailure()) {
      const { name } = result.reason

      expect(name).toEqual('NotFoundError')
    }
  })

  it('should return a BadRequestError if tag is invalid', async () => {
    const result = await sut.execute({
      tag: ''
    })

    expect(result.isFailure()).toBeTruthy()

    if (result.isFailure()) {
      const { name } = result.reason

      expect(name).toEqual('BadRequestError')
    }
  })
})