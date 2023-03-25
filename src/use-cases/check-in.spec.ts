import { InMemoryCheckInsRepository } from '../repositories/in-memory/in-memory-check-ins-repository'
import { describe, it, beforeEach, expect } from 'vitest'
import { CheckInUseCase } from './check-in'

let checkInRepository: InMemoryCheckInsRepository
let sut: CheckInUseCase

describe('Register use Case', () => {
  beforeEach(() => {
    checkInRepository = new InMemoryCheckInsRepository()
    sut = new CheckInUseCase(checkInRepository)
  })

  it('should hash check in', async () => {
    const { checkIn } = await sut.execute({
      gymId: 'gym-idd',
      userId: 'user-id',
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })
})
