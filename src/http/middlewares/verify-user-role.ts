import { FastifyReply, FastifyRequest } from 'fastify'

export function verifyRole(role: 'ADMIN' | 'MEMBER') {
  return (request: FastifyRequest, reply: FastifyReply) => {
    const { role } = request.user

    if (role !== 'ADMIN') {
      return reply.status(401).send({ message: 'Unauthorized.' })
    }
  }
}
