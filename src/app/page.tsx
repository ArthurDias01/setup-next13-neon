import { users } from '@/db/schema'
import { db } from '@/db'
import { InferModel } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'

type NewUser = InferModel<typeof users, 'insert'>

export default async function Home() {
  const allUsers = await db.select().from(users)

  async function addUser(data: FormData) {
    'use server'
    // console.log(data)
    const fullName = data.get('fullName')?.toString()
    const phone = data.get('phone')?.toString()

    if (!fullName || !phone) return null

    await db.insert(users).values({
      fullName,
      phone,
    })

    revalidatePath('/')
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-zinc-900 text-zinc-50">
      <pre>{JSON.stringify(allUsers, null, 2)}</pre>
      <form action={addUser} className="flex flex-col gap-3">
        <input
          type="text"
          name="fullName"
          id="fullName"
          placeholder="fullName"
          className="bg-zinc-800"
        />
        <input
          type="tel"
          name="phone"
          id="phone"
          placeholder="phone"
          className="bg-zinc-800"
        />
        <button type="submit">Create</button>
      </form>
    </div>
  )
}
