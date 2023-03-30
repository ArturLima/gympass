import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { GetUserProfileUseCase } from '../get-user-profile'

export function makeGetUserProfileUSeCase() {
  const prismaUsersRepository = new PrismaUsersRepository()
  const authenticateUserCase = new GetUserProfileUseCase(prismaUsersRepository)

  return authenticateUserCase
}
