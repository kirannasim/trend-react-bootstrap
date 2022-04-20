module.exports = {
	env: {
		browser: true,
		es2021: true,
		node: true,
	},
	extends: "plugin:react/recommended",
	parser: "@typescript-eslint/parser",
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 13,
	},
	plugins: ["react", "@typescript-eslint", "react-hooks"],
	rules: {
		"react/prop-types": "off",
		"react/react-in-jsx-scope": "off",
		"react/display-name": "off",
		"react-hooks/rules-of-hooks": "error",
		"react-hooks/exhaustive-deps": "warn",
	},
};
