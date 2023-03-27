import { InMemoryGymRepository } from '@/repositories/in-memory/in-memory-gym-repository'
import { expect, describe, it, beforeEach } from 'vitest'
import { CreateGymUseCase } from './create-gym'

let gymsRepository: InMemoryGymRepository
let sut: CreateGymUseCase

describe('Create Gym use Case', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymRepository()
    sut = new CreateGymUseCase(gymsRepository)
  })

  it('should able to create gym', async () => {
    const { gym } = await sut.execute({
      title: 'Gym-1',
      description: null,
      phone: null,
      latitude: -3.9332445,
      longitude: -38.5983719,
    })

    expect(gym.id).toEqual(expect.any(String))
  })
})
