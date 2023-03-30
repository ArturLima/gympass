import { GymRepository } from '@/repositories/prisma/prisma-gym-repository'
import { CreateGymUseCase } from '../create-gym'

export function makeCreateGymUSeCase() {
  const gymRepository = new GymRepository()
  const useCase = new CreateGymUseCase(gymRepository)

  return useCase
}
