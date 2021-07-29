import axios from 'axios'
import { NextApiRequest, NextApiResponse } from 'next'
import { withIronSession, Session } from 'next-iron-session'
type NextIronRequest = NextApiRequest & { session: Session }

async function handler(
  req: NextIronRequest,
  res: NextApiResponse
): Promise<void> {
  // get user from database then:
  try {
    const { access_token } = await req.query

    const { data = {} } = await axios.get(
      process.env.NEXT_PUBLIC_API_URL + 'users',
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    )
    const user = data.data[0]

    req.session.set('user', user)
    await req.session.save()
    res.send(
      `[${user?.googleId ? 'Google' : 'Facebook'}] ${user?.email} Logged in.`
    )
  } catch (error) {
    res.status(500).send(error)
  }
}

export default withIronSession(handler, {
  password: process.env.SESSION_KEY || '',
  cookieName: process.env.SESSION_COOKIE_NAME || '',
  // if your localhost is served on http:// then disable the secure flag
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
  },
})
