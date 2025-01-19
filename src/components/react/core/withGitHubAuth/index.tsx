import { type FC } from 'react'

import useGitHubUser from 'hooks/useGitHubUser'

import GitHubSignIn from './GitHubSignIn'

const withGitHubAuth = <Props extends object>(Component: FC<Props>) => {
  return (props: Props) => {
    const { isLoggedIn } = useGitHubUser()

    if (!isLoggedIn) {
      return <GitHubSignIn />
    }

    return <Component {...props} />
  }
}

export default withGitHubAuth
