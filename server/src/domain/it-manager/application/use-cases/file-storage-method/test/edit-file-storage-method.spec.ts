import { makeFileStorageMethod } from 'test/factories/make-file-storage-method'
import { makeUser } from 'test/factories/make-user'
import { InMemoryFileStorageMethodRepository } from 'test/repositories/in-memory-file-storage-method-repository'
import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository'

import { EditFileStorageMethodUseCase } from '../edit-file-storage-method'

let sut: EditFileStorageMethodUseCase
let usersRepository: InMemoryUsersRepository
let repository: InMemoryFileStorageMethodRepository

describe('Get FileStorageMethod By User', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    repository = new InMemoryFileStorageMethodRepository()
    sut = new EditFileStorageMethodUseCase(repository)
  })

  it('should be able to get a file storage method by user', async () => {
    const user = makeUser()
    await usersRepository.create(user)

    const method = makeFileStorageMethod({ userId: user.id })

    repository.create(method)

    const result = await sut.execute({
      id: method.id.toString(),
      userId: user.id.toString(),
      accessKeyId: null,
      bucket: null,
      endpoint: null,
      method: 'local',
      secretAccessKey: null,
      publicEndpoint: null,
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
