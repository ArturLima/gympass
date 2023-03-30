import { CheckInRepository } from '@/repositories/prisma/prisma-check-ins-repository'
import { GetUserMetricsUseCase } from '../get-user-metrics'

export function makeGetUserMetricsUSeCase() {
  const prismaUsersRepository = new CheckInRepository()
  const authenticateUserCase = new GetUserMetricsUseCase(prismaUsersRepository)

  return authenticateUserCase
}
