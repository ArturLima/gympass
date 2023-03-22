import { User } from '@prisma/client'
import { hash } from 'bcryptjs'
import { IUserRepository } from '@/repositories/users-repository'
import { UserAlreadyExistsError } from './errors/user-already-exists'

interface RegisterUseCaseRequest {
  name: string
  email: string
  password: string
}

interface RegisterUSeCaseResponse {
  user: User
}

export class RegisterUseCase {
  constructor(private usersRepository: IUserRepository) {}

  async execute({
    name,
    email,
    password,
  }: RegisterUseCaseRequest): Promise<RegisterUSeCaseResponse> {
    const password_hash = await hash(password, 6)

    const userWithSameEmail = await this.usersRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError()
    }

    const user = await this.usersRepository.create({
      email,
      name,
      password_hash,
    })

    return {
      user,
    }
  }
}
