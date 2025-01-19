import React, { type FC } from 'react'

import { graphql } from 'babel-plugin-relay/macro'
import Relay from 'react-relay'

import type { CommentRepliesListFragment$key } from '__generated__/CommentRepliesListFragment.graphql'
import type { CommentRepliesListPaginationQuery } from '__generated__/CommentRepliesListPaginationQuery.graphql'
import Button from 'components/react/desing-system/Button'

import CommentsItem from '../CommentItem'
import CommentReplyCreate from '../CommentReplyCreate'
import type { CommentRepliesListProps } from './types'

const CommentRepliesListFragmentQuery = graphql`
  fragment CommentRepliesListFragment on DiscussionComment
  @argumentDefinitions(count: { type: "Int", defaultValue: 3 }, cursor: { type: "String" })
  @refetchable(queryName: "CommentRepliesListPaginationQuery") {
    id
    replies(first: $count, after: $cursor) @connection(key: "CommentRepliesListFragment__replies") {
      edges {
        node {
          id
          ...CommentItemFragment
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
`

const CommentRepliesList: FC<CommentRepliesListProps> = ({ discussionId, commentRepliesRef }) => {
  const { data, loadNext, hasNext, isLoadingNext } = Relay.usePaginationFragment<
    CommentRepliesListPaginationQuery,
    CommentRepliesListFragment$key
  >(CommentRepliesListFragmentQuery, commentRepliesRef)

  return (
    <section>
      <ul className="rounded-b-lg bg-surface-default">
        {data?.replies?.edges?.map((edge) => {
          if (!edge?.node) return null

          const comment = edge.node
          return <CommentsItem key={`comment-${comment.id}-reply`} commentRef={comment} isReply />
        })}
        {hasNext && (
          <div className="reply-timeline py-3 pl-[50px]">
            <Button
              size="small"
              variant="text"
              onClick={() => loadNext(3)}
              disabled={isLoadingNext}
            >
              Load More Replies
            </Button>
          </div>
        )}
      </ul>
      <CommentReplyCreate discussionId={discussionId} replyToId={data.id} />
    </section>
  )
}

export default CommentRepliesList
