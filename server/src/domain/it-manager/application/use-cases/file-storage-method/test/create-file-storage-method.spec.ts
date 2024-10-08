import { makeUser } from 'test/factories/make-user'
import { InMemoryFileStorageMethodRepository } from 'test/repositories/in-memory-file-storage-method-repository'
import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository'

import { CreateFileStorageMethodUseCase } from '../create-file-storage-method'

let userRepository: InMemoryUsersRepository
let repository: InMemoryFileStorageMethodRepository
let sut: CreateFileStorageMethodUseCase

describe('Create FileStorageMethod', () => {
  beforeEach(() => {
    userRepository = new InMemoryUsersRepository()
    repository = new InMemoryFileStorageMethodRepository()
    sut = new CreateFileStorageMethodUseCase(repository, userRepository)
  })

  it('should be able to create a r2 file storage method', async () => {
    const user = makeUser()

    userRepository.create(user)

    const result = await sut.execute({
      userId: user.id.toString(),
      method: 'r2',
      endpoint: 'https://any_endpoint.com',
      accessKeyId: 'any_access_key_id',
      secretAccessKey: 'any_secret_access_key',
      bucket: 'any_bucket',
      publicEndpoint: 'https://pub-any_endpoint.com',
    })

    expect(result.isSuccess()).toBeTruthy()

    if (result.isSuccess()) {
      const { fileStorageMethod } = result.value

      expect(fileStorageMethod).toEqual(
        expect.objectContaining({
          method: 'r2',
          endpoint: 'https://any_endpoint.com',
          accessKeyId: 'any_access_key_id',
          secretAccessKey: 'any_secret_access_key',
          bucket: 'any_bucket',
        }),
      )
    }
  })

  it('should be able to create a local file storage method', async () => {
    const user = makeUser()

    userRepository.create(user)

    const result = await sut.execute({
      userId: user.id.toString(),
      method: 'local',
      endpoint: 'https://any_endpoint.com',
      accessKeyId: 'any_access_key_id',
      secretAccessKey: 'any_secret_access_key',
      bucket: 'any_bucket',
      publicEndpoint: 'https://pub-any_endpoint.com',
    })

    expect(result.isSuccess()).toBeTruthy()

    if (result.isSuccess()) {
      const { fileStorageMethod } = result.value

      expect(fileStorageMethod).toEqual(
        expect.objectContaining({
          method: 'local',
          endpoint: null,
          accessKeyId: null,
          secretAccessKey: null,
          bucket: null,
        }),
      )
    }
  })
})
