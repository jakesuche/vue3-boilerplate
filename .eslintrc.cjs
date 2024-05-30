

/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  "rules":{
    'vue/multi-word-component-names': 'off', 
  },
  'extends': [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier/skip-formatting',
     "./.eslintrc-auto-import.json"

  ],
  parserOptions: {
    ecmaVersion: 'latest'
  }
}