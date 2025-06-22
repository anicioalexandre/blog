import { type FC } from 'react'

import { cls } from 'utils/string'

const LoadingState: FC = () => (
  <div className="flex w-full justify-end pt-6">
    <div
      className={
        'grid grid-cols-[auto_min-content] justify-end gap-2 rounded-lg border-[2px] border-surface-border bg-surface-default p-1'
      }
    >
      <div className="h-[32px] w-[25px] animate-pulse rounded bg-surface-active" />
      <button className={cls('emoji-font h-8 w-10 rounded disabled:cursor-not-allowed')}>
        {`\u2764\uFE0F`}
      </button>
    </div>
  </div>
)

export default LoadingState
