#!/bin/bash
# Skip checks if the latest commit has [skip-precheck]
LAST_COMMIT_MSG=$(git log -1 --pretty=%B)
if echo "$LAST_COMMIT_MSG" | grep -qi '\[local-skip\]'; then
  echo "⚠️ Skipping pre-push checks due to [skip-precheck] tag in last commit."
  exit 0
fi

echo "🔍 Running Pre-PR Security & Code Quality Checks..."

# Exit immediately on error
set -e

# Check for required tools
REQUIRED_TOOLS=("prettier" "gitleaks" "eslint")

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


# 4. Commit any Prettier or lint changes if they exist
if ! git diff --cached --quiet || ! git diff --quiet; then
  echo "💾 Committing Prettier or lint fixes..."
  git add .
  git commit -m "style: auto-fix linting and formatting issues [skip-precheck]"

  echo "🛑 Formatting fixes committed. Please review and push again."
  exit 1
else
  echo "✅ No changes to commit."
fi

echo "🚀 All checks passed. Ready to push!"
