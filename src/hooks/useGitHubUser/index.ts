import { useEffect, useState } from 'react'

import Cookies from 'js-cookie'

import { GITHUB_USER_LOGGED_IN } from 'constants/cookie'
import { POSSIBLE_COOKIE_CHANGE_EVENT } from 'constants/event'

const useGitHubUser = () => {
  const isLoggedInDefault = !!Cookies.get(GITHUB_USER_LOGGED_IN)

  const [isLoggedIn, setIsLoggedIn] = useState(isLoggedInDefault)

  useEffect(() => {
    const updateLoginStatus = () => {
      const isLoggedInCookie = !!Cookies.get(GITHUB_USER_LOGGED_IN)
      setIsLoggedIn(isLoggedInCookie)
    }

    window.addEventListener(POSSIBLE_COOKIE_CHANGE_EVENT, updateLoginStatus)

    return () => window.removeEventListener(POSSIBLE_COOKIE_CHANGE_EVENT, updateLoginStatus)
  }, [])

  return { isLoggedIn }
}

export default useGitHubUser
