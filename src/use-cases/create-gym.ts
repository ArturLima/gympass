import { Gym } from '@prisma/client'
import { IGymRepository } from '@/repositories/gym-repository'

interface CreateGymUseCaseRequest {
  title: string
  description: string | null
  phone: string | null
  latitude: number
  longitude: number
}

interface CreateGymUSeCaseResponse {
  gym: Gym
}

export class CreateGymUseCase {
  constructor(private gymsRepository: IGymRepository) {}

  async execute({
    title,
    description,
    phone,
    latitude,
    longitude,
  }: CreateGymUseCaseRequest): Promise<CreateGymUSeCaseResponse> {
    const gym = await this.gymsRepository.create({
      title,
      description,
      phone,
      latitude,
      longitude,
    })

    return {
      gym,
    }
  }
}
