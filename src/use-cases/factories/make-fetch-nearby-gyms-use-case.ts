import { GymRepository } from '@/repositories/prisma/prisma-gym-repository'
import { FetchNearbyGymsUseCase } from '../fetch-nearby-gyms'

export function makeFetchNearbyGymsUSeCase() {
  const gymRepository = new GymRepository()
  const authenticateUserCase = new FetchNearbyGymsUseCase(gymRepository)

  return authenticateUserCase
}
