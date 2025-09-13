#!/bin/bash
# Skip checks if the latest commit has [skip-precheck]
LAST_COMMIT_MSG=$(git log -1 --pretty=%B)
if echo "$LAST_COMMIT_MSG" | grep -qi '\[skip-precheck\]'; then
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

# --- Empty file check ---
echo "📂 Checking for empty files in commits being pushed..."
ALLOW_EMPTY_REGEX='(^|/)\.gitkeep$|(^|/)\.keep$'

if [ -n "$UPSTREAM" ]; then
  BASE=$(git merge-base HEAD "$UPSTREAM")
  FILES_TO_CHECK=$(git diff --name-only --diff-filter=AM "$BASE"..HEAD)
else
  echo "⚠️ No upstream configured (first push) — scanning entire repo..."
  FILES_TO_CHECK=$(git ls-files)
fi

EMPTY_FILES=""
while IFS= read -r file; do
  [ -z "$file" ] && continue
  if echo "$file" | grep -Eq "$ALLOW_EMPTY_REGEX"; then
    continue
  fi
  if [ -f "$file" ] && [ ! -s "$file" ]; then
    EMPTY_FILES+="$file"$'\n'
  fi
done <<< "$FILES_TO_CHECK"

if [ -n "$EMPTY_FILES" ]; then
  echo -e "🛑 Empty files detected:\n$EMPTY_FILES"
  echo -e "Please remove them or add content before pushing.\n"
  exit 1
fi
echo -e "✅ No empty files found.\n"

# 1. Format check
echo "🎨 Running Prettier..."
CHANGED_FILES=$(npx prettier --config .prettierrc.yml --write --list-different .)
if [ -n "$CHANGED_FILES" ]; then
  echo -e "💾 Prettier made changes to:\n$CHANGED_FILES\n"
  git add $CHANGED_FILES
  git commit -m "style: auto-format code with Prettier [skip-precheck]"
  echo -e "🛑 Formatting changes committed. Please review and push again.\n"
  exit 1
else
  echo -e "✅ Prettier passed.\n"
fi

# 2. ESLint check
echo "🧹 Running ESLint..."
if ! npm run lint . --fix; then
  echo -e "❌ ESLint errors found that could not be auto-fixed. Aborting push.\n"
  exit 1
fi
echo -e "✅ ESLint passed.\n"

# 3. Secrets scan
echo "🕵️‍♀️ Running Gitleaks..."
if ! gitleaks detect --source . --report-path gitleaks-report.json --config .gitleaks.toml; then
  echo -e "🛑 Gitleaks detected secrets. Aborting push.\n"
  exit 1
fi
echo -e "✅ No secrets found.\n"

# 4. npm audit
echo "🛡 Running npm audit (high severity or above will block push)..."
if ! npm audit --audit-level=high; then
  echo -e "🛑 npm audit found high-severity vulnerabilities. Please fix before pushing.\n"
  exit 1
fi
echo -e "✅ npm audit passed.\n"

# 5. Commit any Prettier or lint changes
if ! git diff --cached --quiet || ! git diff --quiet; then
  echo "💾 Committing Prettier or lint fixes..."
  git add .
  git commit -m "style: auto-fix linting and formatting issues [skip-precheck]"
  echo -e "🛑 Formatting fixes committed. Please review and push again.\n"
  exit 1
else
  echo -e "✅ No changes to commit.\n"
fi

echo -e "🚀 All checks passed. Ready to push!\n"