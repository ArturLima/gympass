import { describe, it, beforeEach, expect } from 'vitest'
import { InMemoryGymRepository } from '@/repositories/in-memory/in-memory-gym-repository'
import { FetchNearbyGymsUseCase } from './fetch-nearby-gyms'

let gymRepository: InMemoryGymRepository
let sut: FetchNearbyGymsUseCase

describe('Fetch nearby Gyms use Case', () => {
  beforeEach(async () => {
    gymRepository = new InMemoryGymRepository()
    sut = new FetchNearbyGymsUseCase(gymRepository)
  })

  it('should be able to fetch nearby gyms', async () => {
    await gymRepository.create({
      title: 'Near Gym',
      description: null,
      phone: null,
      latitude: -3.9332445,
      longitude: -38.5983719,
    })

    await gymRepository.create({
      title: 'Far Gym',
      description: null,
      phone: null,
      latitude: -4.3093515,
      longitude: -38.7329893,
    })

    const { gyms } = await sut.execute({
      userLatitude: -3.9332445,
      userLongitude: -38.5983719,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'Near Gym' })])
  })
})
