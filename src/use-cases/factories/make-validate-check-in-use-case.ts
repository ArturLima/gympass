import { CheckInRepository } from '@/repositories/prisma/prisma-check-ins-repository'
import { ValidateCheckInUseCase } from '../validate-check-in'

export function makeValidateUSeCase() {
  const prismaUsersRepository = new CheckInRepository()
  const authenticateUserCase = new ValidateCheckInUseCase(prismaUsersRepository)

  return authenticateUserCase
}
