module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	extends: [
		'plugin:react/recommended',
		'airbnb',
		'plugin:@typescript-eslint/recommended',
		'prettier',
		'plugin:cypress/recommended',
	],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 12,
		sourceType: 'module',
	},
	plugins: ['react', '@typescript-eslint', 'prettier', 'cypress'],
	rules: {
		'no-use-before-define': 'off',
		'@typescript-eslint/no-use-before-define': ['error'],
		'@typescript-eslint/no-unused-vars': [
			'warn',
			{
				argsIgnorePattern: '^_',
				varsIgnorePattern: '^_',
				caughtErrorsIgnorePattern: '^_',
			},
		],
		'react/jsx-filename-extension': [
			'warn',
			{ extensions: ['.js', '.jsx', '.ts', '.tsx'] },
		],
		'import/extensions': [
			'error',
			'ignorePackages',
			{
				ts: 'never',
				tsx: 'never',
				js: 'never',
				jsx: 'never',
			},
		],
		semi: ['error', 'always'],
		'react/jsx-props-no-spreading': 'off',
		'react/require-default-props': 'off',
		'prettier/prettier': [
			'warn',
			{
				singleQuote: true,
				semi: true,
				useTabs: true,
				tabWidth: 1,
				jsxSingleQuote: true,
				arrowParens: 'avoid',
				endOfLine: 'auto',
			},
		],
		'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
	},
	settings: {
		'import/resolver': {
			typescript: {},
			node: {
				extensions: ['.js', '.jsx', '.ts', '.tsx'],
				moduleDirectory: ['node_modules', 'src/'],
			},
		},
	},
};
