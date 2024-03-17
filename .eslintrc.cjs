/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    'plugin:tailwindcss/recommended',
    'prettier'
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules: {
    'vue/component-tags-order': [
      'error',
      {
        order: ['script', 'template', 'style']
      }
    ],
    'vue/multi-word-component-names': 'off',
    'vue/component-api-style': ['error', ['script-setup', 'composition']],
    'vue/component-name-in-template-casing': 'error',
    'vue/define-macros-order': [
      'warn',
      {
        order: ['defineProps', 'defineEmits']
      }
    ],
    'vue/define-emits-declaration': ['error', 'type-based'],
    'vue/define-props-declaration': ['error', 'type-based'],
    'vue/match-component-import-name': 'error',
    'vue/no-ref-object-destructure': 'error',
    'vue/no-unused-refs': 'error',
    'vue/no-useless-v-bind': 'error',
    'vue/padding-line-between-tags': 'warn',
    'vue/prefer-separate-static-class': 'error',
    'vue/prefer-true-attribute-shorthand': 'error',
    'vue/no-v-html': 'off',

    'tailwindcss/no-custom-classname': 'off',

    'no-undef': 'off',
    'no-unused-vars': 'off',
    'no-console': ['warn']
  }
}
