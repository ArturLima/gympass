import { CheckInRepository } from '@/repositories/prisma/prisma-check-ins-repository'
import { GymRepository } from '@/repositories/prisma/prisma-gym-repository'
import { CheckInUseCase } from '../check-in'

export function makeCheckInUSeCase() {
  const prismaUsersRepository = new CheckInRepository()
  const gymsRepository = new GymRepository()
  const authenticateUserCase = new CheckInUseCase(
    prismaUsersRepository,
    gymsRepository,
  )

  return authenticateUserCase
}
