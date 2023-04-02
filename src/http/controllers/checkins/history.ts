import { makeFetchUserCheckInsHistoryUSeCase } from '@/use-cases/factories/make-fetch-check-ins-hisotry-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function history(request: FastifyRequest, reply: FastifyReply) {
  const checkInHistoryBodySchema = z.object({
    page: z.coerce.number().min(1).default(1),
  })

  const { page } = checkInHistoryBodySchema.parse(request.query)

  const fetchUserCheckInGymUseCase = makeFetchUserCheckInsHistoryUSeCase()

  const { checkIns } = await fetchUserCheckInGymUseCase.execute({
    page,
    userId: request.user.sub,
  })

  return reply.status(200).send({ checkIns })
}
