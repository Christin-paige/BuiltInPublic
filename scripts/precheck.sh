#!/bin/bash

echo "🔍 Running Pre-PR Security & Code Quality Checks..."

# Exit immediately on error
set -e

# Check for required tools
REQUIRED_TOOLS=("prettier" "gitleaks" "semgrep" "eslint")

for tool in "${REQUIRED_TOOLS[@]}"; do
  if ! command -v $tool &> /dev/null; then
    echo "❌ $tool is not installed. Please install it before pushing."
    exit 1
  fi
done

# 1. Format check & fix
echo "🎨 Running Prettier..."
npx prettier --config .prettierrc.yml --write .

# 2. ESLint check & fix
echo "🧹 Running ESLint..."
if ! npm run lint . --fix; then
  echo "❌ ESLint errors found that could not be auto-fixed. Aborting push."
  exit 1
fi
echo "✅ ESLint passed."

# 3. Secrets scan with Gitleaks
echo "🕵️‍♀️ Running Gitleaks..."
if ! gitleaks detect --source . --report-path gitleaks-report.json --config .gitleaks.toml; then
  echo "🛑 Gitleaks detected secrets. Aborting push."
  exit 1
fi

# 4. Static analysis with Semgrep
echo "🧠 Running Semgrep..."
npm run semgrep

# 5. Commit any Prettier or ESLint changes, if present
if ! git diff --quiet || ! git diff --cached --quiet; then
  echo "💾 Committing auto-fixed changes..."
  git add .
  git commit -m "style: auto-fix linting and formatting issues"
else
  echo "✅ No changes to commit."
fi

echo "🚀 All checks passed. Ready to push!"
