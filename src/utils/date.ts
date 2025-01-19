export const formatDate = (date: Date) => {
  const dateInstance = new Date(date)
  const options = { timeZone: 'UTC', month: '2-digit', day: '2-digit', year: 'numeric' } as const

  if (dateInstance.toString() === 'Invalid Date') {
    return 'Invalid Date'
  }

  return new Intl.DateTimeFormat('en-US', options).format(dateInstance)
}

export const formatRelativeDate = (date: Date) => {
  const now = new Date()
  const dateInstance = new Date(date)

  const diffMs = now.getTime() - dateInstance.getTime()
  if (diffMs < 0) return 'Invalid Date'

  const dayInMilliseconds = 24 * 60 * 60 * 1000
  const dayDiff = Math.floor(diffMs / dayInMilliseconds)

  if (dayDiff === 0) return 'today'
  if (dayDiff === 1) return 'yesterday'
  if (dayDiff <= 6) return `${dayDiff} days ago`

  if (dayDiff <= 27) {
    const weeks = Math.floor(dayDiff / 7)
    return `${weeks} week${weeks > 1 ? 's' : ''} ago`
  }

  const months = Math.floor(dayDiff / 30)
  if (months <= 11) {
    return `${months} month${months !== 1 ? 's' : ''} ago`
  }

  const years = Math.floor(dayDiff / 365)
  return `${years} year${years !== 1 ? 's' : ''} ago`
}
