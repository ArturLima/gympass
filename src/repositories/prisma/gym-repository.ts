import { Gym } from '@prisma/client'
import { IGymRepository } from '../gym-repository'

export class GymRepository implements IGymRepository {
  async findById(id: string): Promise<Gym | null> {
    throw new Error('Method not implemented.')
  }
}
