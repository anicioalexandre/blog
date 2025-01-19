import { POSSIBLE_COOKIE_CHANGE_EVENT } from 'constants/event'

export const triggerPossibleCookieChangeEvent = () =>
  window.dispatchEvent(new Event(POSSIBLE_COOKIE_CHANGE_EVENT))
