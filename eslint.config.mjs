import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  ...compat.config({
        extends: ['next'],
        rules: {
          "react/react-in-jsx-scope": "off",
          "react/no-unescaped-entities": "off",
          "react/no-unknown-property": ["error", { ignore: ["css"] }],
          "@typescript-eslint/no-unused-vars": [
            "warn",
            {
              argsIgnorePattern: "^_",
              varsIgnorePattern: "^_",
            },
          ],
          "@typescript-eslint/no-explicit-any": "warn", // or "off" if you're OK with it during dev
        }
  }),
];

export default eslintConfig;
