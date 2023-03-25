import { prisma } from '@/lib/prisma'
import { Prisma, User } from '@prisma/client'
import { IUserRepository } from '../users-repository'

export class PrismaUsersRepository implements IUserRepository {
  async findById(userId: string): Promise<User | null> {
    return await prisma.user.findUnique({
      where: {
        id: userId,
      },
    })
  }

  async findByEmail(email: string) {
    return await prisma.user.findUnique({
      where: {
        email,
      },
    })
  }

  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data,
    })

    return user
  }
}
