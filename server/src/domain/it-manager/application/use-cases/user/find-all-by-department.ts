import { User } from '@/domain/it-manager/enterprise/entities/user'
import { UsersRepository } from '../../repositories/users-repository'

type FindAllByDepartmentUseCaseResponse = {
  users: User[]
}

export class FindAllByDepartmentUseCase {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute(departmentId: string): Promise<FindAllByDepartmentUseCaseResponse> {
    const users = await this.usersRepository.findManyByDepartment(departmentId)

    return { users }
  }
}
