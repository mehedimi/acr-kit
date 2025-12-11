// ESLint Flat Config for Vue 3 + TypeScript + Vite
// Uses latest ESLint with flat config and keeps stylistic rules minimal to coexist with Prettier

import vue from 'eslint-plugin-vue'
import tseslint from 'typescript-eslint'
import vueParser from 'vue-eslint-parser'
import tsParser from '@typescript-eslint/parser'

export default [
	{
		ignores: ['dist/**', 'node_modules/**', 'vite.config.*', '*.min.*'],
	},

	// Vue recommended rules (flat config)
	...vue.configs['flat/recommended'],

	// TypeScript recommended rules
	...tseslint.configs.recommended,

	{
		files: ['**/*.{ts,tsx,js,jsx,vue}'],
		languageOptions: {
			parser: vueParser,
			parserOptions: {
				parser: tsParser,
				ecmaVersion: 'latest',
				sourceType: 'module',
				extraFileExtensions: ['.vue'],
			},
		},
		rules: {
			// Keep stylistic rules light; let Prettier handle formatting
			'no-unused-vars': 'off', // handled by TS version below
			'@typescript-eslint/no-unused-vars': [
			'warn',
			{ argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
			],
			'vue/multi-word-component-names': 'off',
		},
	},
	]
