import { makeFileStorageMethod } from 'test/factories/make-file-storage-method'
import { makeUser } from 'test/factories/make-user'
import { InMemoryFileStorageMethodRepository } from 'test/repositories/in-memory-file-storage-method-repository'
import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository'

import { GetFileStorageMethodByUserUseCase } from '../get-file-storage-method-by-user'

let sut: GetFileStorageMethodByUserUseCase
let usersRepository: InMemoryUsersRepository
let repository: InMemoryFileStorageMethodRepository

describe('Get FileStorageMethod By User', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    repository = new InMemoryFileStorageMethodRepository()
    sut = new GetFileStorageMethodByUserUseCase(repository, usersRepository)
  })

  it('should be able to get a file storage method by user', async () => {
    const user = makeUser()
    await usersRepository.create(user)

    const method = makeFileStorageMethod({ userId: user.id })

    repository.create(method)

    const result = await sut.execute({
      userId: user.id.toString(),
    })

    expect(result.isSuccess()).toBeTruthy()

    if (result.isSuccess()) {
      const { fileStorageMethod } = result.value

      expect(fileStorageMethod).toEqual(
        expect.objectContaining({
          method: method.method,
          endpoint: method.endpoint,
          accessKeyId: method.accessKeyId,
          secretAccessKey: method.secretAccessKey,
          bucket: method.bucket,
          publicEndpoint: method.publicEndpoint,
        }),
      )
    }
  })
})
