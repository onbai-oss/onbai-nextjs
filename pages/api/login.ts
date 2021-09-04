import { NextApiRequest, NextApiResponse } from 'next'
import { Session, withIronSession } from 'next-iron-session'
type NextIronRequest = NextApiRequest & { session: Session }

async function handler(
  req: NextIronRequest,
  res: NextApiResponse
): Promise<void> {
  // get user from database then:
  const { user } = await req.body

  req.session.set('user', user)
  await req.session.save()
  res.send(`${user?.email} Logged in`)
}

export default withIronSession(handler, {
  password: process.env.SESSION_KEY || '',
  cookieName: process.env.SESSION_COOKIE_NAME || '',
  // if your localhost is served on http:// then disable the secure flag
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
  },
})
