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
      discussionId: discussionId!,
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
            subjectId: discussionId!,
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
            subjectId: discussionId!,
            content: 'HEART',
          },
        },
      })
    }
  }

  const renderButton = () => {
    if (isLoggedIn)
      return (
        <button
          onClick={() => handleReaction()}
          disabled={isAddinReaction || isRemovingReaction}
          className={cls('emoji-font h-8 w-10 rounded', buttonStyle)}
        >
          {`\u2764\uFE0F`}
        </button>
      )

    const redirectTo = encodeURIComponent(window.location.pathname + '#post-reactions')
    const signInUrl = `${import.meta.env.PUBLIC_WEBSITE_URL}/api/oauth-login?redirect_to=${redirectTo}`

    return (
      <a
        title="Sign in to react"
        className={cls('emoji-font flex h-8 w-10 items-center justify-center rounded', buttonStyle)}
        href={signInUrl}
      >
        {`\u2764\uFE0F`}
      </a>
    )
  }

  const buttonStyle = hasReacted ? 'bg-primary-main' : 'hover:bg-primary-main'

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
      <div
        className={
          'grid grid-cols-[auto_min-content] justify-end gap-2 rounded-lg border-[2px] border-surface-border bg-surface-default p-1'
        }
      >
        <p className="prose-subtitle1 grid min-w-[25px] items-center justify-center text-object-high">
          {heartReactionGroup?.reactors.totalCount}
        </p>
        {renderButton()}
      </div>
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
