import React, { type FC } from 'react'

import { graphql } from 'babel-plugin-relay/macro'
import Relay from 'react-relay'

import type { CommentsListFragment$key } from '__generated__/CommentsListFragment.graphql'
import type { CommentsListPaginationQuery } from '__generated__/CommentsListPaginationQuery.graphql'
import Button from 'components/react/desing-system/Button'

import CommentCreate from '../CommentCreate'
import CommentsItem from '../CommentItem'
import CommentRepliesList from '../CommentRepliesList'
import { NUMBER_OF_COMMENTS_TO_LOAD_MORE } from './constants'
import type { CommentsListProps } from './types'

const CommentsListFragmentQuery = graphql`
  fragment CommentsListFragment on Discussion
  @argumentDefinitions(count: { type: "Int", defaultValue: 5 }, cursor: { type: "String" })
  @refetchable(queryName: "CommentsListPaginationQuery") {
    id
    comments(first: $count, after: $cursor) @connection(key: "CommentsListFragment__comments") {
      totalCount
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

  if (data?.comments.totalCount === 0) {
    return (
      <section className="grid gap-4 pb-3 pt-6">
        <h3 className="prose-h3">{data?.comments.totalCount} comments</h3>
        <div className="grid auto-rows-min items-center justify-items-center gap-2 p-4">
          <img src="/images/desert.png" alt="Desert" className="w-48" />
          <h6 className="prose-h6">Nothing here yet... What’s on your mind?</h6>
        </div>
        <CommentCreate discussionId={discussionId} />
      </section>
    )
  }

  return (
    <section className="grid gap-4 pb-3 pt-6">
      <h3 className="prose-h3">{data?.comments.totalCount} comments</h3>
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
          onClick={() => loadNext(NUMBER_OF_COMMENTS_TO_LOAD_MORE)}
          disabled={isLoadingNext}
          className="m-auto w-fit"
        >
          Load More Comments
        </Button>
      )}
      <CommentCreate discussionId={discussionId} />
    </section>
  )
}

export default CommentsList
