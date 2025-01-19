const LoadingState = () => (
  <div className="flex h-fit items-center justify-center space-x-2 bg-transparent p-6">
    <div className="h-4 w-4 animate-bounce rounded-full bg-primary-main [animation-delay:-0.3s]"></div>
    <div className="h-4 w-4 animate-bounce rounded-full bg-primary-main [animation-delay:-0.15s]"></div>
    <div className="h-4 w-4 animate-bounce rounded-full bg-primary-main"></div>
  </div>
)

export default LoadingState
