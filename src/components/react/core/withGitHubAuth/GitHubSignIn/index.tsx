import Anchor from 'components/react/desing-system/Anchor'
import Textarea from 'components/react/desing-system/Textarea'
import GitHubIcon from 'components/react/desing-system/icons/GitHubIcon'

const GitHubSignIn = () => {
  const redirectTo = encodeURIComponent(window.location.pathname + '#comments')
  const signInUrl = `${import.meta.env.PUBLIC_WEBSITE_URL}/api/oauth-login?redirect_to=${redirectTo}`

  return (
    <div className="grid gap-1">
      <h3 className="prose-subtitle1 text-object-high">Add a comment</h3>
      <div className="grid gap-2">
        <Textarea
          value=""
          onChange={() => {}}
          onBlur={() => {}}
          isLoading
          placeholder="Sign in to comment"
          disabled
        />
        <div className="flex justify-end">
          <Anchor href={signInUrl}>
            <div className="grid grid-cols-[min-content,1fr] items-center gap-1">
              <GitHubIcon /> Sign in with GitHub
            </div>
          </Anchor>
        </div>
      </div>
    </div>
  )
}

export default GitHubSignIn
