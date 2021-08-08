export const PAGES = {
  NOT_LOGIN: '/not-login',
  LANDING: '/landing',
  DASHBOARD: '/dashboard',
  LOGIN: '/login',
  SIGNUP: '/signup',
  FORGOT_PASSWORD: '/forgot-password',
  NEW: '/new',
  COLLECTION: '/collection',
  NEW_COLLECION: '/new-collection',
  EDIT_COLLECION: '/edit-collection',
  QUESTION: '/question',
  NEW_QUESTION: '/new-question',
  EDIT_QUESTION: '/edit-question',
  NEW_ROOM: '/new-room',
  ROOM: '/room',
}

export const API_PATH = {
  USER: 'user',
  AUTH: 'authentication',
  COLLECTION: 'collection',
  QUESTION: 'question',
  ROOM: 'room',
}

export const ROOM = {
  STATUS: {
    WAIT: 0,
    PLAYING: 1,
    END: 2,
  },
  ROLE: {
    HOST: 0,
    GUEST: 1,
  },
  TYPE: {
    SOLO: 0,
    TEAM: 1,
    WATCH: 2,
  },
  RULE: {
    SCORE: 0,
    TIMER: 1,
    ALL: 2,
  },
}
