import { GymRepository } from '@/repositories/prisma/prisma-gym-repository'
import { SearchGymsUseCase } from '../search-gyms'

export function makeSearchGymsUSeCase() {
  const gymRepository = new GymRepository()
  const authenticateUserCase = new SearchGymsUseCase(gymRepository)

  return authenticateUserCase
}
