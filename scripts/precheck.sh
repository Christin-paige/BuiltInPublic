#!/bin/bash

echo "🔍 Running Pre-PR Security Checks..."

# Exit immediately on error
set -e

# 0. Check for required tools

# Prettier check
if ! npx --no-install prettier --version &> /dev/null; then
  echo "❌ Prettier is not installed. Please run: npm install --save-dev prettier"
  exit 1
fi

# Gitleaks check
if ! command -v gitleaks &> /dev/null; then
  echo "❌ Gitleaks is not installed. Please install it: https://github.com/gitleaks/gitleaks#installation"
  exit 1
fi

# Semgrep check
if ! command -v semgrep &> /dev/null; then
  echo "❌ Semgrep is not installed. Please run: pip install semgrep"
  exit 1
fi

# 1. Format check & fix
echo "🎨 Checking Prettier formatting & Fixing..."
npx prettier --write .

# 2. Secrets scan with Gitleaks
echo "🕵️‍♀️ Running Gitleaks detect (pre-push)..."
if ! gitleaks detect --source . --report-path gitleaks-report.json --config .gitleaks.toml; then
  echo "🛑 Gitleaks detected secrets. Aborting push."
  exit 1
fi

# 3. Static analysis
echo "🧠 Running Semgrep..."
npm run semgrep

# 4. Commit any Prettier or lint changes if they exist
if ! git diff --cached --quiet || ! git diff --quiet; then
  echo "💾 Committing Prettier or lint fixes..."
  git add .
  git commit -m "style: auto-format with Prettier & pass security checks"
else
  echo "✅ No changes to commit."
fi

echo "🚀 All checks passed. Ready to push!"
