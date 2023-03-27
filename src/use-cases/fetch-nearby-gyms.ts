import { Gym } from '@prisma/client'
import { IGymRepository } from '@/repositories/gym-repository'

interface FetchNearbyGymsUseCaseRequest {
  userLatitude: number
  userLongitude: number
}

interface FetchNearbyGymsUSeCaseResponse {
  gyms: Gym[]
}

export class FetchNearbyGymsUseCase {
  constructor(private gymsRepository: IGymRepository) {}

  async execute({
    userLatitude,
    userLongitude,
  }: FetchNearbyGymsUseCaseRequest): Promise<FetchNearbyGymsUSeCaseResponse> {
    const gyms = await this.gymsRepository.findManyNearby({
      latitude: userLatitude,
      longitude: userLongitude,
    })

    return {
      gyms,
    }
  }
}
