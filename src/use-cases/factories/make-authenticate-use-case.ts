import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { AuthenticateUseCase } from '../authenticate'

export function makeAuthenticateUSeCase() {
  const prismaUsersRepository = new PrismaUsersRepository()
  const authenticateUserCase = new AuthenticateUseCase(prismaUsersRepository)

  return authenticateUserCase
}
