/**
 * @template T, P
 * @typedef {{ [K in `${P}${keyof T}`]: K extends `${P}${infer U & keyof T}` ? T[U] : never }} PrefixKeys
 */

/**
 * @typedef {import('eslint').Linter.Config} ESLintConfig
 * @typedef {Partial<import('eslint/rules').ESLintRules>} ESLintRules
 * @typedef {Partial<PrefixKeys<typeof import('@typescript-eslint/eslint-plugin/dist/rules').default, '@typescript-eslint/'>} TypescriptESLintRules
 * @typedef {Partial<PrefixKeys<import('eslint-plugin-react')['rules'], 'react/'>>} ReactESLintRules
 **/

// https://eslint.org/docs/rules/
/** @type {ESLintRules} */
const eslintRules = {
  'arrow-parens': ['off'],
  'constructor-super': ['error'],
  'comma-dangle': ['error', { objects: 'always-multiline', arrays: 'always-multiline', imports: 'always-multiline' }],
  'dot-notation': ['off'],
  'guard-for-in': ['error'],
  'max-classes-per-file': ['warn', 5],
  'no-bitwise': ['error'],
  'no-caller': ['error'],
  'no-cond-assign': ['error'],
  'no-console': ['off'],
  'no-debugger': ['error'],
  'no-empty': ['off'],
  'no-empty-function': ['off'],
  'no-eval': ['error'],
  'no-fallthrough': ['error'],
  'no-new-wrappers': ['error'],
  'no-redeclare': ['off'],
  'no-shadowed': ['off'],
  'no-unused-expressions': ['off'],
  'no-unused-labels': ['error'],
  'no-use-before-define': ['off'],
  'one-var': [
    'error',
    {
      initialized: 'never',
      uninitialized: 'never',
    },
  ],
  'prettier/prettier': ['off'],
  radix: ['error', 'as-needed'],
  'sort-keys': ['off'],
  semi: ['off'],
};

// https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin
/** @type {TypescriptESLintRules} */
const eslintTypescriptRules = {
  '@typescript-eslint/ban-ts-comment': [
    'error',
    {
      'ts-ignore': 'allow-with-description',
    },
  ],
  '@typescript-eslint/consistent-type-assertions': [
    'warn',
    {
      assertionStyle: 'as',
      objectLiteralTypeAssertions: 'allow',
    },
  ],
  '@typescript-eslint/explicit-member-accessibility': ['off'],
  '@typescript-eslint/explicit-module-boundary-types': ['off'],
  '@typescript-eslint/member-ordering': ['off'],
  '@typescript-eslint/naming-convention': [
    'off',
    {
      selector: 'default',
      leadingUnderscore: 'allow',
    },
  ],
  '@typescript-eslint/no-empty-function': ['off'],
  '@typescript-eslint/no-empty-interface': ['off'],
  '@typescript-eslint/no-explicit-any': ['off'],
  '@typescript-eslint/no-throw-literal': ['error'],
  '@typescript-eslint/no-unused-vars': ['off'],
  '@typescript-eslint/no-use-before-define': ['off'],
  '@typescript-eslint/no-var-requires': ['off'],
  '@typescript-eslint/no-non-null-assertion': ['off'],
  '@typescript-eslint/triple-slash-reference': ['error'],
  '@typescript-eslint/semi': ['error'],
};

/** @type {ReactESLintRules} */
const eslintReactRules = {
  'react/display-name': ['off'],
  'react/jsx-boolean-value': ['error', 'never'],
  'react/jsx-sort-props': [
    'warn',
    {
      reservedFirst: ['ref', 'key'],
    },
  ],
  'react/prop-types': ['off'],
};

// https://eslint.org/docs/user-guide/configuring
/** @type {ESLintConfig} */
module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'plugin:react/recommended', // Uses the recommended rules from @eslint-plugin-react
    'plugin:react-hooks/recommended', // Uses the recommended rules from eslint-plugin-react-hooks
    'plugin:@typescript-eslint/recommended', // Uses the recommended rules from the @typescript-eslint/eslint-plugin
    'plugin:prettier/recommended', // Enables eslint-plugin-prettier and eslint-config-prettier. This will display prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
  ],
  parser: '@typescript-eslint/parser', // Specifies the ESLint parser
  parserOptions: {
    ecmaFeatures: {
      jsx: true, // Allows for the parsing of JSX
    },
    project: './tsconfig.json',
    ecmaVersion: 2019, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module', // Allows for the use of imports
  },
  plugins: ['@typescript-eslint'],
  settings: {
    react: {
      version: 'detect', // Tells eslint-plugin-react to automatically detect the version of React to use
    },
  },
  rules: {
    ...eslintRules,
    ...eslintTypescriptRules,
    ...eslintReactRules,
  },
  ignorePatterns: ['/*.*'],
};
