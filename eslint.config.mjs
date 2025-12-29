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
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
    ],
    rules: {
      "@next/next/no-img-element": "off",          // allow <img> usage
      "@typescript-eslint/no-explicit-any": "warn", // allow 'any' but warn
      "react-hooks/exhaustive-deps": "warn",       // warn on missing useEffect deps
    },
  },
];

export default eslintConfig;
