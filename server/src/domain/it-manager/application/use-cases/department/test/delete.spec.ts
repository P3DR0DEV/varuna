import { InMemoryDepartmentRepository } from 'test/repositories/in-memory-department-repository'
import { DeleteDepartmentUseCase } from '../delete'
import { RegisterDepartmentUseCase } from '../register'

let departmentsRepository: InMemoryDepartmentRepository
let sut: DeleteDepartmentUseCase
let register: RegisterDepartmentUseCase

describe('Delete Department Use Case', () => {
  beforeEach(async () => {
    departmentsRepository = new InMemoryDepartmentRepository()
    sut = new DeleteDepartmentUseCase(departmentsRepository)
    register = new RegisterDepartmentUseCase(departmentsRepository)

    await register.execute({
      description: 'department description',
      email: 'any_email@example.com',
    })
  })

  it('should delete a department', async () => {
    const result = await sut.execute(departmentsRepository.items[0].id.toString())

    expect(result.isSuccess()).toBeTruthy()

    if (result.isSuccess()) {
      const { message } = result.value
      expect(message).toEqual('Department deleted successfully')
    }
  })

  it('should return a NotFoundError', async () => {
    const id = departmentsRepository.items[0].id.toString()
    // delete the department for the first time
    await sut.execute(id)

    // tries to delete it again
    const result = await sut.execute(id)

    expect(result.isFailure()).toBeTruthy()

    if (result.isFailure()) {
      const { name } = result.reason
      expect(name).toEqual('NotFoundError')
    }
  })

  it('should return a BadRequestError', async () => {
    // tries to delete an empty id
    const result = await sut.execute('')

    expect(result.isFailure()).toBeTruthy()

    if (result.isFailure()) {
      const { name } = result.reason
      expect(name).toEqual('BadRequestError')
    }
  })
})
