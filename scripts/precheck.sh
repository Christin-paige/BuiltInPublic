#!/bin/bash

echo "🔍 Running Pre-PR Security Checks..."

# Exit immediately on error
set -e

# 1. Format check & fix
echo "🎨 Checking Prettier formatting & Fixing..."
npx prettier --write .

# 2. Secrets scan
echo "🕵️‍♀️ Scanning for secrets with Gitleaks..."
npx gitleaks detect --source . --report-path gitleaks-report.json

# 3. Static analysis
echo "🧠 Running Semgrep..."
npm run semgrep

echo "✅ All checks passed!"
