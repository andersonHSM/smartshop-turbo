// import js from "@eslint/js";
// import eslintConfigPrettier from "eslint-config-prettier";
// import turboPlugin from "eslint-plugin-turbo";
// import tseslint from "typescript-eslint";
// import onlyWarn from "eslint-plugin-only-warn";
//
//
// /**
//  * A shared ESLint configuration for the repository.
//  *
//  * @type {import("eslint").Linter.Config[]}
//  * */
// export const config = [
// 	js.configs.recommended,
// 	eslintConfigPrettier,
// 	...tseslint.configs.recommended,
// 	eslintPluginPrettierRecommended,
// 	{
// 		plugins: {
// 			turbo: turboPlugin,
// 		},
// 		rules: {
// 			"turbo/no-undeclared-env-vars": "warn",
// 		},
// 	},
// 	{
// 		plugins: {
// 			onlyWarn,
// 		},
// 	},
// 	{
// 		ignores: ["dist/**"],
// 	},
// 	{
// 		rules: {
// 			'@typescript-eslint/no-explicit-any': 'off',
// 			'@typescript-eslint/no-unsafe-assignment': 'off',
// 			'@typescript-eslint/no-unsafe-call': 'off',
// 			'@typescript-eslint/no-unsafe-member-access': 'off',
// 			'@typescript-eslint/no-unsafe-function-type': 'off',
// 			'@typescript-eslint/no-unsafe-argument': 'off',
// 			'@typescript-eslint/no-unsafe-return': 'off',
// 			'@typescript-eslint/no-unused-expressions': 'off',
// 			'@typescript-eslint/no-require-imports': 'off',
// 			'@typescript-eslint/no-unused-vars': 'off',
// 			"@typescript-eslint/no-misused-promises": [
// 				"error",
// 				{
// 					"checksVoidReturn": false,
// 					"checksConditionals": false
// 				}
// 			],
// 			"@typescript-eslint/require-await": "off",
// 			'@typescript-eslint/prefer-promise-reject-errors': 'off',
// 			'@typescript-eslint/no-base-to-string': 'off',
// 			'@typescript-eslint/unbound-method': 'off',
// 			'@typescript-eslint/only-throw-error': 'off',
// 		}
// 	}
// ];
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-config-prettier';

export default tseslint.config(
  {
    ignores: ['node_modules', '**/node_modules/**', '**/*.js', '**/*.d.ts'],
  },

  eslint.configs.recommended,
  tseslint.configs.recommended,
  tseslint.configs.recommendedTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unsafe-function-type': 'off',
      '@typescript-eslint/no-unsafe-argument': 'off',
      '@typescript-eslint/no-unsafe-return': 'off',
      '@typescript-eslint/no-unused-expressions': 'off',
      '@typescript-eslint/no-require-imports': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-misused-promises': [
        'error',
        {
          checksVoidReturn: false,
          checksConditionals: false,
        },
      ],
      '@typescript-eslint/require-await': 'off',
      '@typescript-eslint/prefer-promise-reject-errors': 'off',
      '@typescript-eslint/no-base-to-string': 'off',
      '@typescript-eslint/unbound-method': 'off',
      '@typescript-eslint/only-throw-error': 'off',
    },
    extends: [prettier],
  },
);
