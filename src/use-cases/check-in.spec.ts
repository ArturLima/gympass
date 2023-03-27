import { InMemoryCheckInsRepository } from '../repositories/in-memory/in-memory-check-ins-repository'
import { describe, it, beforeEach, expect, vi, afterEach } from 'vitest'
import { CheckInUseCase } from './check-in'
import { InMemoryGymRepository } from '@/repositories/in-memory/in-memory-gym-repository'
import { Decimal } from '@prisma/client/runtime/library'
import { MaxNumberOfCheckInsError } from './errors/max-number-of-check-ins-error'
import { MaxDistanceError } from './errors/max-distance-error'

let checkInRepository: InMemoryCheckInsRepository
let gymRepository: InMemoryGymRepository
let sut: CheckInUseCase

describe('Register use Case', () => {
  beforeEach(async () => {
    checkInRepository = new InMemoryCheckInsRepository()
    gymRepository = new InMemoryGymRepository()
    sut = new CheckInUseCase(checkInRepository, gymRepository)

    await gymRepository.create({
      id: 'gym-idd',
      title: 'Academia js',
      description: '',
      phone: '',
      latitude: new Decimal(0),
      longitude: new Decimal(0),
    })

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should hash check in', async () => {
    const { checkIn } = await sut.execute({
      gymId: 'gym-idd',
      userId: 'user-id',
      userLatitude: 0,
      userLongitude: 0,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in twice in the same day', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

    await sut.execute({
      gymId: 'gym-idd',
      userId: 'user-id',
      userLatitude: 0,
      userLongitude: 0,
    })

    await expect(() =>
      sut.execute({
        gymId: 'gym-idd',
        userId: 'user-id',
        userLatitude: 0,
        userLongitude: 0,
      }),
    ).rejects.toBeInstanceOf(MaxNumberOfCheckInsError)
  })

  it('should not be able to check in twice but different days', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

    await sut.execute({
      gymId: 'gym-idd',
      userId: 'user-id',
      userLatitude: 0,
      userLongitude: 0,
    })

    vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0))

    const { checkIn } = await sut.execute({
      gymId: 'gym-idd',
      userId: 'user-id',
      userLatitude: 0,
      userLongitude: 0,
    })
    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in on distant gym', async () => {
    gymRepository.items.push({
      id: 'gym-idd2',
      title: 'Academia js',
      description: '',
      phone: '',
      latitude: new Decimal(-3.9332445),
      longitude: new Decimal(-38.5983719),
    })

    await expect(() =>
      sut.execute({
        gymId: 'gym-idd2',
        userId: 'user-id',
        userLatitude: -4.0110534,
        userLongitude: -38.6224066,
      }),
    ).rejects.toBeInstanceOf(MaxDistanceError)
  })
})
