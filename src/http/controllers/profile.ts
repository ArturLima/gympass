import { makeGetUserProfileUSeCase } from '@/use-cases/factories/make-get-user-profile-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'

export async function profile(request: FastifyRequest, reply: FastifyReply) {
  const getUserProfile = makeGetUserProfileUSeCase()

  const { user } = await getUserProfile.execute({
    userId: request.user.sub,
  })

  return reply.status(201).send({
    user: {
      ...user,
      password_hash: undefined,
    },
  })
}
