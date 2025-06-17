module.exports = {
  // other config...
  rules: {
    // Turn off the base rule
    "no-unused-vars": "off",
    // Use the TypeScript version instead
    "@typescript-eslint/no-unused-vars": [
      "warn",
      {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
        caughtErrorsIgnorePattern: "^_",
      },
    ],
  },
};
