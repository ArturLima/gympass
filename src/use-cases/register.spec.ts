import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { compare } from 'bcryptjs'
import { expect, describe, it, beforeEach } from 'vitest'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'
import { RegisterUseCase } from './register'

let userRepository: InMemoryUsersRepository
let sut: RegisterUseCase

describe('Register use Case', () => {
  beforeEach(() => {
    userRepository = new InMemoryUsersRepository()
    sut = new RegisterUseCase(userRepository)
  })

  it('should hash user password upon registration', async () => {
    const { user } = await sut.execute({
      name: 'Artur',
      email: 'arturpei@gmail.com',
      password: '123456',
    })

    const isPasswordCorrectlyHashed = await compare(
      '123456',
      user.password_hash,
    )

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not be able to register with same email twice', async () => {
    const email = 'arturpei@gmail.com'

    await sut.execute({
      name: 'Artur',
      email,
      password: '123456',
    })

    await expect(() =>
      sut.execute({
        name: 'Artur',
        email,
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })

  it('should be albe to register', async () => {
    const { user } = await sut.execute({
      name: 'Artur',
      email: 'arturpei@gmail.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })
})
