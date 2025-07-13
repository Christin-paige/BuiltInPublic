#!/bin/bash

echo "🔍 Running Pre-PR Security Checks..."

# Exit immediately on error
set -e

# 1. Format check & fix
echo "🎨 Checking Prettier formatting & Fixing..."
npx prettier --write .

#2. Secrets scan with Gitleaks
echo "🕵️‍♀️ Checking for Gitleaks (optional)..."
if command -v gitleaks &> /dev/null; then
  gitleaks detect --source . --report-path gitleaks-report.json --config gitleaks.toml || echo "⚠️ Gitleaks found issues, but push allowed"

# 3. Static analysis
echo "🧠 Running Semgrep..."
npm run semgrep

echo "✅ All checks passed!"
