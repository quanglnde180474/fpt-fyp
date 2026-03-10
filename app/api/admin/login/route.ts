import { NextRequest, NextResponse } from 'next/server'
import { getUserByEmail } from '@/lib/services/users.service'
import { createSession, hashPassword } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      )
    }

    try {
      const user = await getUserByEmail(email)
      if (!user) {
        return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
      }

      const passwordHash = await hashPassword(password)
      if (user.passwordHash !== passwordHash) {
        return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
      }

      await createSession(String(user.id), user.email, user.role)
      return NextResponse.json({ success: true })
    } catch (dbError) {
      console.error('DB error during login:', dbError)
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    }
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
