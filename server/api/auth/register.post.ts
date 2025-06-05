import { users } from "~/server/database/schema"
import { useDrizzle } from "~/server/utils/drizzle"

export default defineEventHandler(async (event) => {
  const { name, email, password } = await readBody(event)

  const harshedPassword = await hashPassword(password)

  const existingUser = await useDrizzle()
    .select()
    .from(users)
    .where(eq(users.email, email))
    .get()
  if (existingUser) {
    return createError({
      statusCode: 409,
      statusMessage: 'Email already exists'
    })
  }
  if (!name || !email || !password) {
    return createError({
      statusCode: 400,
      statusMessage: 'Name, email, and password are required'
    })
  }

  await useDrizzle().insert(users).values({
    name,
    email,
    password: harshedPassword,
    avatar: "", // or provide a default avatar URL if needed
    createdAt: new Date()
  }).returning().get()

  return ({
    statusCode: 201,
    statusMessage: 'User registered successfully'
  })
})
