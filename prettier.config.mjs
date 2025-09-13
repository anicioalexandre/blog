/** @type {import("prettier").Config} */
export default {
  singleQuote: true,
  trailingComma: 'all',
  semi: false,
  printWidth: 100,
  // importOrder: [
  //   '^react$',
  //   '<THIRD_PARTY_MODULES>',
  //   '^(components|constants|hooks|layouts|providers|public|styles|types|services|utils|modules|__generated__)',
  //   '^[./]',
  // ],
  // importOrderSeparation: true,
  // importOrderSortSpecifiers: true,
  plugins: [
    // '@trivago/prettier-plugin-sort-imports',
    'prettier-plugin-astro',
    'prettier-plugin-tailwindcss'
  ],
}
