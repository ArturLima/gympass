import { CheckIn, Prisma } from '@prisma/client'

export interface ICheckRepository {
  create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>
}
