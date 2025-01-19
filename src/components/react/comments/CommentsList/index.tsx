import React, { type FC } from 'react'

import { graphql } from 'babel-plugin-relay/macro'
import Relay from 'react-relay'

import type { CommentsListFragment$key } from '__generated__/CommentsListFragment.graphql'
import type { CommentsListPaginationQuery } from '__generated__/CommentsListPaginationQuery.graphql'
import Button from 'components/react/desing-system/Button'

import CommentCreate from '../CommentCreate'
import CommentsItem from '../CommentItem'
import CommentRepliesList from '../CommentRepliesList'
import type { CommentsListProps } from './types'

const CommentsListFragmentQuery = graphql`
  fragment CommentsListFragment on Discussion
  @argumentDefinitions(count: { type: "Int", defaultValue: 5 }, cursor: { type: "String" })
  @refetchable(queryName: "CommentsListPaginationQuery") {
    id
    comments(first: $count, after: $cursor) @connection(key: "CommentsListFragment__comments") {
      edges {
        node {
          id
          ...CommentItemFragment
          ...CommentRepliesListFragment
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
`

const CommentsList: FC<CommentsListProps> = ({ discussionId, commentsRef }) => {
  const { data, loadNext, hasNext, isLoadingNext } = Relay.usePaginationFragment<
    CommentsListPaginationQuery,
    CommentsListFragment$key
  >(CommentsListFragmentQuery, commentsRef)

  return (
    <>
      <ul className="space-y-4">
        {data?.comments?.edges?.map((edge) => {
          if (!edge?.node) return null

          const comment = edge.node
          return (
            <CommentsItem key={`comment-${comment.id}`} commentRef={comment}>
              <CommentRepliesList discussionId={discussionId} commentRepliesRef={comment} />
            </CommentsItem>
          )
        })}
      </ul>
      {hasNext && (
        <Button
          size="small"
          onClick={() => loadNext(5)}
          disabled={isLoadingNext}
          className="m-auto w-fit"
        >
          Load More Comments
        </Button>
      )}
      <CommentCreate discussionId={discussionId} />
    </>
  )
}

export default CommentsList
