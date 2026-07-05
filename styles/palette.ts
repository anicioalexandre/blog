/*
 * Themed color tokens live in styles/tokens.css as CSS variables
 * (light on :root, dark on :root.dark) and are consumed by
 * tailwind.config.mjs via rgb(var(--token) / <alpha-value>).
 * Only theme-independent colors remain here.
 */
export const black = {
  main: '#000000',
}

export const white = {
  main: '#FFFFFF',
}
