import { type FC, Suspense } from 'react'

import { graphql } from 'babel-plugin-relay/macro'
import Relay from 'react-relay'

import type { CommentsQuery } from '__generated__/CommentsQuery.graphql'
import withProviders from 'components/react/core/withProviders'
import LoadingState from 'components/react/desing-system/LoadingState'

import CommentsList from '../CommentsList'
import type { CommentsProps } from './types'

const CommentsQuery = graphql`
  query CommentsQuery($discussionId: ID!) {
    node(id: $discussionId) {
      ...CommentsListFragment
    }
  }
`

const Comments: FC<CommentsProps> = ({ discussionId }) => {
  const data = Relay.useLazyLoadQuery<CommentsQuery>(CommentsQuery, {
    discussionId: discussionId,
  })

  if (!data.node || !discussionId) {
    return null
  }

  return <CommentsList discussionId={discussionId} commentsRef={data.node} />
}

const SuspendedComments: FC<CommentsProps> = ({ discussionId }) => (
  <Suspense fallback={discussionId ? <LoadingState /> : null}>
    <Comments discussionId={discussionId} />
  </Suspense>
)

const CommentsWithProviders = withProviders(SuspendedComments)
// @ts-expect-error
CommentsWithProviders.displayName = 'Comments'
export default CommentsWithProviders
