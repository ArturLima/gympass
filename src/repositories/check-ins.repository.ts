import { CheckIn, Prisma } from '@prisma/client'

export interface ICheckRepository {
  findManyByUserId(userId: string, page: number): Promise<CheckIn[]>
  findById(userId: string): Promise<CheckIn | null>
  findByUserIdOnDate(userId: string, date: Date): Promise<CheckIn | null>
  countByUserId(userId: string): Promise<number>
  create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>
  save(data: CheckIn): Promise<CheckIn>
}
