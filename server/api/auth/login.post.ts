import { users } from "~/server/database/schema"
import { eq, and } from "drizzle-orm"
import { z } from "zod"

const bodySchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, "Password must be at least 8 characters long")
})
const comparePassword = async (hashedPassword: string, plainPassword: string) => {
  return await verifyPassword(hashedPassword, plainPassword)
}
export default defineEventHandler(async (event) => {
  const { email, password } = await readValidatedBody(event, bodySchema.parse)
  const login = await useDrizzle()
    .select()
    .from(users)
    .where(and(eq(users.email, email)))
    .get()
  if (!login) {
    return createError({
      statusCode: 401,
      statusMessage: 'Email người dùng không tồn tại',
    })
  } else if (!(await comparePassword(login.password, password))) {
    return createError({
      statusCode: 401,
      statusMessage: 'Mật khẩu không chính xác',
    })
  }

  await setUserSession(event, {
    user: {
      id: login.id,
      name: login.name,
      email: login.email,
      avatar: login.avatar,
    }
  })

  return ({
    statusCode: 200,
    statusMessage: 'Login successful',
  })
})
