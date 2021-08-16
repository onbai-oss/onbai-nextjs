export const PAGES = {
  NOT_LOGIN: '/not-login',
  LANDING: '/landing',
  DASHBOARD: '/dashboard',
  LOGIN: '/login',
  SIGNUP: '/signup',
  FORGOT_PASSWORD: '/forgot-password',
  COLLECTION: '/collection',
  NEW_COLLECION: '/new-collection',
  EDIT_COLLECION: '/edit-collection',
  QUESTION: '/question',
  NEW_QUESTION: '/new-question',
  EDIT_QUESTION: '/edit-question',
  NEW_ROOM: '/new-room',
  ROOM: '/room',
  TERM: '/term',
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
    WAIT: 'wait',
    PLAYING: 'playing',
    END: 'end',
  },
  ROLE: {
    HOST: 'host',
    GUEST: 'guest',
  },
  TYPE: {
    SOLO: 'solo',
    TEAM: 'team',
    WATCH: 'watch',
  },
  RULE: {
    SCORE: 'score',
    TIMER: 'time',
    ALL: 'all',
  },
}
