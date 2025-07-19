#!/bin/bash

echo "🔍 Running Pre-PR Security Checks..."

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
echo "🎨 Checking Prettier formatting & fixing..."
npx prettier --config .prettierrc.yml --write .

# 2. ESLint check & fix
echo "🧹 Running ESLint linting & fixing..."
npm run lint -- --fix

# 3. Secrets scan with Gitleaks
echo "🕵️‍♀️ Running Gitleaks detect (pre-push)..."
if ! gitleaks detect --source . --report-path gitleaks-report.json --config .gitleaks.toml; then
  echo "🛑 Gitleaks detected secrets. Aborting push."
  exit 1
fi

# 4. Static analysis with Semgrep
echo "🧠 Running Semgrep..."
npm run semgrep

# 5. Commit any Prettier or lint changes if they exist
if ! git diff --cached --quiet || ! git diff --quiet; then
  echo "💾 Committing Prettier or lint fixes..."
  git add .
  git commit -m "style: auto-fix linting and formatting issues"
else
  echo "✅ No changes to commit."
fi

echo "🚀 All checks passed. Ready to push!"
