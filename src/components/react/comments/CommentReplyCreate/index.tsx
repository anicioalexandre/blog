import React, { type FC, useRef, useState } from 'react'

import { graphql } from 'babel-plugin-relay/macro'
import Relay from 'react-relay'

import type { CommentReplyCreateMutation as CommentReplyCreateMutationType } from '__generated__/CommentReplyCreateMutation.graphql'
import Button from 'components/react/desing-system/Button'
import Textarea from 'components/react/desing-system/Textarea'
import useGitHubUser from 'hooks/useGitHubUser'
import { useReactForm } from 'hooks/useReactForm'

import { INITIAL_VALUES, VALIDATION_SCHEMA } from './constants'
import type { CommentReplyCreateForm, CommentReplyCreateProps } from './types'

export const CommentReplyCreateMutation = graphql`
  mutation CommentReplyCreateMutation($input: AddDiscussionCommentInput!, $connections: [ID!]!) {
    addDiscussionComment(input: $input) {
      comment @appendNode(connections: $connections, edgeTypeName: "DiscussionCommentEdge") {
        ...CommentItemFragment
      }
    }
  }
`

const CommentReplyCreate: FC<CommentReplyCreateProps> = ({ discussionId, replyToId }) => {
  const { isLoggedIn } = useGitHubUser()

  const [isFocused, setIsFocused] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)
  const [commitMutation, isInFlight] = Relay.useMutation<CommentReplyCreateMutationType>(
    CommentReplyCreateMutation,
  )

  const { getInputProps, validate, handleSubmit, resetValues, isValid, values } = useReactForm({
    schema: VALIDATION_SCHEMA,
    initialValues: INITIAL_VALUES,
  })

  const onValidSubmit = (formValues: CommentReplyCreateForm) => {
    const connectionID = Relay.ConnectionHandler.getConnectionID(
      replyToId,
      'CommentRepliesListFragment__replies',
    )

    commitMutation({
      // @ts-expect-error
      cacheConfig: {
        metadata: {
          mode: 'user',
        },
      },
      variables: {
        input: { body: formValues.body, discussionId, replyToId },
        connections: [connectionID],
      },
      onCompleted: () => {
        resetValues()
        setIsFocused(false)
      },
      onError: console.error,
    })
  }

  const shouldShowReplyButton = isFocused || isInFlight || !!values.body

  if (!isLoggedIn) {
    return null
  }

  return (
    <form
      id={`id="reply-comment-${replyToId}-form"`}
      className="bg-surface-active p-3"
      onBlur={() => setIsFocused(false)}
      onFocus={() => setIsFocused(true)}
      onSubmit={handleSubmit(onValidSubmit)}
      ref={formRef}
    >
      <div className="grid gap-2">
        <Textarea
          {...getInputProps('body')}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && e.ctrlKey) {
              e.preventDefault()
              handleSubmit(onValidSubmit)(e)
            }
          }}
          disabled={!isLoggedIn}
          onBlur={() => validate()}
          isLoading={isInFlight}
          placeholder="Write a reply"
          mode="compact"
          isFocused={isFocused}
        />
        {shouldShowReplyButton && (
          <div className="flex justify-end">
            <Button
              form={`id="reply-comment-${replyToId}-form"`}
              size="small"
              type="submit"
              disabled={isInFlight || !isValid}
            >
              Reply
            </Button>
          </div>
        )}
      </div>
    </form>
  )
}

export default CommentReplyCreate
