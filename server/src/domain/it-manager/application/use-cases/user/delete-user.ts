import { UseCase } from '@/core/use-cases/use-case'
import { UsersRepository } from '../../repositories/users-repository'
import { Either, failure, success } from '@/core/types/either'
import { NotFound, NotFoundError } from '@/core/errors/not-found'
import { BadRequest, BadRequestError } from '@/core/errors/bad-request'

type DeleteUserUseCaseProps = { id: string }
type DeleteUserUseCaseResponse = Either<BadRequestError | NotFoundError, { message: string }>

export class DeleteUserUseCase implements UseCase {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute({ id }: DeleteUserUseCaseProps): Promise<DeleteUserUseCaseResponse> {
    if (!id) {
      return failure(BadRequest('Id is required'))
    }
    const user = await this.usersRepository.findById(id)

    if (!user) {
      return failure(NotFound('This user has already been deleted or does not exist'))
    }

    await this.usersRepository.delete(id)

    return success({ message: 'User deleted successfully' })
  }
}
