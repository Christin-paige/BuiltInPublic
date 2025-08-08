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

# Check for empty files in the staged changes
echo "📂 Checking for empty files..."

# Files we allow to be empty (placeholders, etc.)
ALLOW_EMPTY_REGEX='(^|/)\.gitkeep$|(^|/)\.keep$'

if git rev-parse --abbrev-ref --symbolic-full-name @{u} >/dev/null 2>&1; then
  # Diff from upstream merge-base to current HEAD
  BASE=$(git merge-base HEAD @{u})
  CANDIDATES=$(git diff --name-only --diff-filter=AM "$BASE"..HEAD)
else
  # No upstream yet (first push) — check all committed changes
  CANDIDATES=$(git diff --name-only --diff-filter=AM HEAD~1..HEAD 2>/dev/null || git ls-files)
fi

EMPTY_FILES=""
while IFS= read -r file; do
  [ -z "$file" ] && continue
  # Skip allowed placeholders
  if echo "$file" | grep -Eq "$ALLOW_EMPTY_REGEX"; then
    continue
  fi
  if [ -f "$file" ] && [ ! -s "$file" ]; then
    EMPTY_FILES+="$file"$'\n'
  fi
done <<< "$CANDIDATES"

if [ -n "$EMPTY_FILES" ]; then
  echo -e "🛑 Empty files detected:\n$EMPTY_FILES"
  echo -e "Please remove them or add content before pushing.\n"
  exit 1
else
  echo -e "✅ No empty files found.\n"
fi

# 1. Format check & fix
echo "🎨 Running Prettier..."
CHANGED_FILES=$(npx prettier --config .prettierrc.yml --write --list-different .)
if [ -n "$CHANGED_FILES" ]; then
  echo -e "💾 Prettier made changes to the following files:\n"
  echo -e "$CHANGED_FILES\n"
  git add $CHANGED_FILES
  git commit -m "style: auto-format code with Prettier [skip-precheck]"

  echo -e "🛑 Formatting changes committed. Please review and push again.\n"
  exit 1
else
  echo -e "✅ Prettier passed.\n"
fi

# 2. ESLint check & fix
echo "🧹 Running ESLint..."
if ! npm run lint . --fix; then
  echo -e "❌ ESLint errors found that could not be auto-fixed. Aborting push.\n"
  exit 1
fi
echo -e "✅ ESLint passed.\n"

# 3. Secrets scan with Gitleaks
echo -e "🕵️‍♀️ Running Gitleaks...\n"
if ! gitleaks detect --source . --report-path gitleaks-report.json --config .gitleaks.toml; then
  echo -e "🛑 Gitleaks detected secrets. Aborting push.\n"
  exit 1
fi


# 4. Commit any Prettier or lint changes if they exist
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
