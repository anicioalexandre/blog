export const ERROR_CODE = {
  '001': {
    message: 'Invalid authentication state. Please try logging in again.',
    redirectLabel: 'Go To Blog',
    redirectUrl: '/blog',
  },
  '002': {
    message: 'Your login session has expired. Please try logging in again.',
    redirectLabel: 'Go To Blog',
    redirectUrl: '/blog',
  },
  '003': {
    message: 'GitHub authentication failed. Please try logging in again.',
    redirectLabel: 'Go To Blog',
    redirectUrl: '/blog',
  },
  default: {
    message: 'An unexpected error occurred',
    redirectLabel: 'Go To Home',
    redirectUrl: '/',
  },
} as const
