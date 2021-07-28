import { withIronSession } from 'next-iron-session'

function handler(req, res, session) {
  const user = req.session.get('user')
  req.session.destroy()
  res.send(user ? `${user?.email + ' logged out'}  ` : 'You not login.')
}

export default withIronSession(handler, {
  password: process.env.SESSION_KEY || '',
  cookieName: process.env.SESSION_COOKIE_NAME || '',
  // if your localhost is served on http:// then disable the secure flag
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
  },
})
