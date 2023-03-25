import { prisma } from '@/lib/prisma'
import { Prisma, CheckIn } from '@prisma/client'
import { ICheckRepository } from '../check-ins.repository'

export class CheckInRepository implements ICheckRepository {
  async create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn> {
    return await prisma.checkIn.create({
      data,
    })
  }
}
