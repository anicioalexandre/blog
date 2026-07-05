import { type FC } from 'react'

const LoadingState: FC = () => (
  <div className="flex w-full justify-end pt-6">
    <div className="flex h-10 select-none items-center gap-2 rounded-none border-2 border-ink bg-surface-default px-3 shadow-key">
      <span className="emoji-font">{`❤️`}</span>
      <div className="h-4 w-5 animate-pulse rounded-none bg-surface-active" />
    </div>
  </div>
)

export default LoadingState
