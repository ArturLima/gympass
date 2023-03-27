import { Gym } from '@prisma/client'
import { IGymRepository } from '@/repositories/gym-repository'

interface SearchGymsUseCaseRequest {
  query: string
  page: number
}

interface SearchGymsUSeCaseResponse {
  gyms: Gym[]
}

export class SearchGymsUseCase {
  constructor(private gymsRepository: IGymRepository) {}

  async execute({
    query,
    page,
  }: SearchGymsUseCaseRequest): Promise<SearchGymsUSeCaseResponse> {
    const gyms = await this.gymsRepository.searchMany(query, page)

    return {
      gyms,
    }
  }
}
