import { describe, it, beforeEach, expect } from 'vitest'
import { InMemoryGymRepository } from '@/repositories/in-memory/in-memory-gym-repository'
import { SearchGymsUseCase } from './search-gyms'

let gymRepository: InMemoryGymRepository
let sut: SearchGymsUseCase

describe('Fetch User CheckIns History use Case', () => {
  beforeEach(async () => {
    gymRepository = new InMemoryGymRepository()
    sut = new SearchGymsUseCase(gymRepository)
  })

  it('should be able to search for gyms', async () => {
    await gymRepository.create({
      title: 'Javascript Gym',
      description: null,
      phone: null,
      latitude: -3.9332445,
      longitude: -38.5983719,
    })

    await gymRepository.create({
      title: 'Typescript Gym',
      description: null,
      phone: null,
      latitude: -3.9332445,
      longitude: -38.5983719,
    })

    const { gyms } = await sut.execute({
      query: 'Javascript',
      page: 1,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'Javascript Gym' })])
  })

  it('should be able to fetch paginated gyms search', async () => {
    for (let i = 1; i <= 22; i++) {
      await gymRepository.create({
        title: `Javascript Gym ${i}`,
        description: null,
        phone: null,
        latitude: -3.9332445,
        longitude: -38.5983719,
      })
    }

    const { gyms } = await sut.execute({
      query: 'Javascript',
      page: 2,
    })
    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'Javascript Gym 21' }),
      expect.objectContaining({ title: 'Javascript Gym 22' }),
    ])
  })
})
