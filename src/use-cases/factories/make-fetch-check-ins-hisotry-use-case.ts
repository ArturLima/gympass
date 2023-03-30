import { CheckInRepository } from '@/repositories/prisma/prisma-check-ins-repository'
import { FetchUserCheckInsHistoryUseCase } from '../fetch-user-check-ins-history'

export function makeFetchUserCheckInsHistoryUSeCase() {
  const prismaUsersRepository = new CheckInRepository()
  const authenticateUserCase = new FetchUserCheckInsHistoryUseCase(
    prismaUsersRepository,
  )

  return authenticateUserCase
}
