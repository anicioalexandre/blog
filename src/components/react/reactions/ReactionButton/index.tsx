import { type FC, Suspense, useEffect, useRef } from 'react'

import { graphql } from 'babel-plugin-relay/macro'
import Relay from 'react-relay'

import type { ReactionButtonAddMutation as ReactionButtonAddMutationType } from '__generated__/ReactionButtonAddMutation.graphql'
import type { ReactionButtonQuery as ReactionButtonQueryType } from '__generated__/ReactionButtonQuery.graphql'
import type { ReactionButtonRemoveMutation as ReactionButtonRemoveMutationType } from '__generated__/ReactionButtonRemoveMutation.graphql'
import withProviders from 'components/react/core/withProviders'
import useGitHubUser from 'hooks/useGitHubUser'
import { cls } from 'utils/string'

import LoadingState from './LoadingState'
import type { ReactionButtonProps } from './types'

const ReactionButtonQuery = graphql`
  query ReactionButtonQuery($discussionId: ID!) {
    node(id: $discussionId) {
      ... on Discussion {
        reactionGroups {
          content
          reactors {
            totalCount
          }
          viewerHasReacted
        }
      }
    }
  }
`

export const ReactionButtonAddMutation = graphql`
  mutation ReactionButtonAddMutation($input: AddReactionInput!) {
    addReaction(input: $input) {
      reaction {
        content
      }
      subject {
        id
        ... on Discussion {
          reactionGroups {
            content
            reactors {
              totalCount
            }
            viewerHasReacted
          }
        }
      }
    }
  }
`

export const ReactionButtonRemoveMutation = graphql`
  mutation ReactionButtonRemoveMutation($input: RemoveReactionInput!) {
    removeReaction(input: $input) {
      reaction {
        content
      }
      subject {
        id
        ... on Discussion {
          reactionGroups {
            content
            reactors {
              totalCount
            }
            viewerHasReacted
          }
        }
      }
    }
  }
`

const ReactionButton: FC<ReactionButtonProps> = ({ discussionId }) => {
  const { isLoggedIn } = useGitHubUser()
  const data = Relay.useLazyLoadQuery<ReactionButtonQueryType>(
    ReactionButtonQuery,
    {
      discussionId: discussionId,
    },
    { networkCacheConfig: { metadata: { mode: isLoggedIn ? 'user' : 'app' } } },
  )
  const [addReaction, isAddinReaction] =
    Relay.useMutation<ReactionButtonAddMutationType>(ReactionButtonAddMutation)
  const [removeReaction, isRemovingReaction] = Relay.useMutation<ReactionButtonRemoveMutationType>(
    ReactionButtonRemoveMutation,
  )

  const heartReactionGroup = data.node?.reactionGroups?.find((group) => group.content === 'HEART')
  const hasReacted = heartReactionGroup?.viewerHasReacted

  const handleReaction = (controlHasReacted = hasReacted) => {
    if (controlHasReacted) {
      removeReaction({
        // @ts-expect-error
        cacheConfig: {
          metadata: {
            mode: 'user',
          },
        },
        variables: {
          input: {
            subjectId: discussionId,
            content: 'HEART',
          },
        },
      })
    } else {
      addReaction({
        // @ts-expect-error
        cacheConfig: {
          metadata: {
            mode: 'user',
          },
        },
        variables: {
          input: {
            subjectId: discussionId,
            content: 'HEART',
          },
        },
      })
    }
  }

  // A toggle key: raised while un-reacted, stays pressed-in (dropped, no
  // edge) and amber once reacted.
  const buttonBase =
    'flex h-10 select-none items-center gap-2 rounded-none border-2 border-ink px-3 transition-none focus-visible:outline-dotted focus-visible:outline-1 focus-visible:outline-offset-[-4px] focus-visible:outline-ink'
  const buttonStyle = hasReacted
    ? 'translate-x-[2px] translate-y-[2px] bg-primary-main text-object-contrast shadow-none'
    : 'bg-surface-default text-object-high shadow-retro-sm hover:bg-surface-active active:translate-x-[2px] active:translate-y-[2px] active:shadow-none'

  const buttonContent = (
    <>
      <span className="emoji-font" aria-hidden="true">{`\u2764\uFE0F`}</span>
      <span className="prose-subtitle1 min-w-[20px] text-center">
        {heartReactionGroup?.reactors.totalCount}
      </span>
    </>
  )

  const renderButton = () => {
    if (isLoggedIn)
      return (
        <button
          onClick={() => handleReaction()}
          disabled={isAddinReaction || isRemovingReaction}
          aria-pressed={hasReacted}
          aria-label="Like this post"
          className={cls(buttonBase, buttonStyle, 'disabled:cursor-not-allowed')}
        >
          {buttonContent}
        </button>
      )

    const redirectTo = encodeURIComponent(window.location.pathname + '#post-reactions')
    const signInUrl = `${import.meta.env.PUBLIC_WEBSITE_URL}/api/oauth-login?redirect_to=${redirectTo}`

    return (
      <a
        title="Sign in to react"
        aria-label="Sign in to like this post"
        className={cls(buttonBase, buttonStyle)}
        href={signInUrl}
      >
        {buttonContent}
      </a>
    )
  }

  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (window.location.hash === '#post-reactions') {
      if (elementRef.current) {
        handleReaction(false)
        elementRef.current.scrollIntoView({ behavior: 'smooth' })
        window.history.replaceState(
          {},
          document.title,
          window.location.pathname + window.location.search,
        )
      }
    }
  }, [])

  return (
    <div ref={elementRef} className="flex w-full justify-end pt-6">
      {renderButton()}
    </div>
  )
}

const SuspendedReactionButton: FC<ReactionButtonProps> = ({ discussionId }) => (
  <Suspense fallback={discussionId ? <LoadingState /> : null}>
    <ReactionButton discussionId={discussionId} />
  </Suspense>
)

const ReactionButtonWithProviders = withProviders(SuspendedReactionButton)
// @ts-expect-error
ReactionButtonWithProviders.displayName = 'ReactionButton'
export default ReactionButtonWithProviders
