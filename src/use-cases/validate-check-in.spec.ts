import { InMemoryCheckInsRepository } from '../repositories/in-memory/in-memory-check-ins-repository'
import { describe, it, beforeEach, expect, afterEach, vi } from 'vitest'
import { ValidateCheckInUseCase } from './validate-check-in'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { LateCheckInValidationError } from './errors/late-check-in-validation-error'

let checkInRepository: InMemoryCheckInsRepository
let sut: ValidateCheckInUseCase

describe('Validate Check in use Case', () => {
  beforeEach(async () => {
    checkInRepository = new InMemoryCheckInsRepository()

    sut = new ValidateCheckInUseCase(checkInRepository)

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to validate the check-in', async () => {
    const createdCheckIn = await checkInRepository.create({
      gym_id: 'gym-01',
      user_id: 'user-01',
    })

    const { checkIn } = await sut.execute({
      checkId: createdCheckIn.id,
    })

    expect(checkIn.validated_at).toEqual(expect.any(Date))
    expect(checkInRepository.items[0].validated_at).toEqual(expect.any(Date))
  })

  it('should not be able to validate an inexistent check-in', async () => {
    await expect(() =>
      sut.execute({
        checkId: 'inexistent-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it('should not be able to validate the check-in after 20 minutes of its creation', async () => {
    vi.setSystemTime(new Date(2023, 0, 1, 13, 40))

    const createdCheckIn = await checkInRepository.create({
      gym_id: 'gym-01',
      user_id: 'user-01',
    })

    const TwentyOneMinutesInMS = 1000 * 60 * 21
    vi.advanceTimersByTime(TwentyOneMinutesInMS)

    await expect(() =>
      sut.execute({
        checkId: createdCheckIn.id,
      }),
    ).rejects.toBeInstanceOf(LateCheckInValidationError)
  })
})
