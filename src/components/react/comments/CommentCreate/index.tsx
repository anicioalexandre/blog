import React, { type FC, useEffect, useRef } from 'react'

import { graphql } from 'babel-plugin-relay/macro'
import { removeUserCookies } from 'pages/api/remove-user-cookies'
import Relay from 'react-relay'

import type { CommentCreateMutation as CommentCreateMutationType } from '__generated__/CommentCreateMutation.graphql'
import withGitHubAuth from 'components/react/core/withGitHubAuth'
import Button from 'components/react/desing-system/Button'
import Textarea from 'components/react/desing-system/Textarea'
import { useReactForm } from 'hooks/useReactForm'
import { triggerPossibleCookieChangeEvent } from 'utils/event'

import { INITIAL_VALUES, VALIDATION_SCHEMA } from './constants'
import type { CommentCreateForm, CommentCreateProps } from './types'

export const CommentCreateMutation = graphql`
  mutation CommentCreateMutation($input: AddDiscussionCommentInput!, $connections: [ID!]!) {
    addDiscussionComment(input: $input) {
      comment @appendNode(connections: $connections, edgeTypeName: "DiscussionCommentEdge") {
        ...CommentItemFragment
        ...CommentRepliesListFragment
      }
    }
  }
`

const CommentCreate: FC<CommentCreateProps> = ({ discussionId }) => {
  const formRef = useRef<HTMLFormElement>(null)
  const [commitMutation, isInFlight] =
    Relay.useMutation<CommentCreateMutationType>(CommentCreateMutation)

  const { getInputProps, validate, handleSubmit, resetValues, isValid } = useReactForm({
    schema: VALIDATION_SCHEMA,
    initialValues: INITIAL_VALUES,
  })

  const onValidSubmit = (formValues: CommentCreateForm) => {
    const connectionID = Relay.ConnectionHandler.getConnectionID(
      discussionId,
      'CommentsListFragment__comments',
    )

    commitMutation({
      // @ts-expect-error
      cacheConfig: {
        metadata: {
          mode: 'user',
        },
      },
      variables: {
        input: { body: formValues.body, discussionId },
        connections: [connectionID],
      },
      onCompleted: () => {
        resetValues()
      },
      onError: console.error,
    })
  }

  const handleSignOut = async () => {
    await removeUserCookies()
    triggerPossibleCookieChangeEvent()
  }

  useEffect(() => {
    if (window.location.hash === '#comments') {
      if (formRef.current) {
        formRef.current.scrollIntoView({ behavior: 'smooth' })
        window.history.replaceState(
          {},
          document.title,
          window.location.pathname + window.location.search,
        )
      }
    }
  }, [])

  return (
    <form
      id="create-comment-form"
      ref={formRef}
      onSubmit={handleSubmit(onValidSubmit)}
      className="grid gap-1"
    >
      <h3 className="prose-subtitle1 text-object-high">Add a comment</h3>
      <div className="grid gap-2">
        <Textarea
          {...getInputProps('body')}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && e.ctrlKey) {
              e.preventDefault()
              handleSubmit(onValidSubmit)(e)
            }
          }}
          onBlur={() => validate()}
          isLoading={isInFlight}
          placeholder="Comment here..."
        />
        <div className="flex justify-between gap-2">
          <Button size="small" className="col-start-1" variant="text" onClick={handleSignOut}>
            Sign out
          </Button>
          <Button
            form="create-comment-form"
            type="submit"
            disabled={isInFlight || !isValid}
            className="col-start-2"
          >
            Comment
          </Button>
        </div>
      </div>
    </form>
  )
}

const CommentCreateWithGitHubAuth = withGitHubAuth(CommentCreate)
// @ts-expect-error
CommentCreateWithGitHubAuth.displayName = 'CommentCreate'
export default CommentCreateWithGitHubAuth
