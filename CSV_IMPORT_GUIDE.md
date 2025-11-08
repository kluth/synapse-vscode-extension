# GitHub Issues CSV Import Guide

## Overview

The `github-issues-import.csv` file contains all 148 GitHub issues for the Synapse VSCode Extension project, ready for bulk import into GitHub.

## File Details

- **Total Issues**: 148
- **File Size**: ~57KB
- **Format**: CSV with proper escaping for multi-line content
- **Location**: `/home/user/synapse-vscode-extension/github-issues-import.csv`

## CSV Structure

The CSV has 4 columns:

| Column | Description | Example |
|--------|-------------|---------|
| `title` | Issue title with task number | "1.1: Initialize package.json..." |
| `body` | Full markdown description with acceptance criteria | "## Description\n\nSet up package.json..." |
| `labels` | Comma-separated labels | "phase:setup,type:infrastructure,priority:high" |
| `milestone` | Phase milestone name | "Phase 1: Project Setup & Infrastructure" |

## Import Methods

### Method 1: Using GitHub CLI (gh) - RECOMMENDED

This is the most reliable method for bulk import.

#### Prerequisites

1. Install GitHub CLI:
   ```bash
   # Ubuntu/Debian
   sudo apt install gh

   # macOS
   brew install gh

   # Windows
   winget install --id GitHub.cli
   ```

2. Authenticate:
   ```bash
   gh auth login
   ```

#### Import Script

Create a script to import all issues:

```bash
#!/bin/bash
# import-issues.sh

CSV_FILE="github-issues-import.csv"
REPO="kluth/synapse-vscode-extension"

# Skip the header row and process each line
tail -n +2 "$CSV_FILE" | while IFS=, read -r title body labels milestone; do
  # Remove quotes from fields
  title=$(echo "$title" | sed 's/^"//;s/"$//')
  body=$(echo "$body" | sed 's/^"//;s/"$//')
  labels=$(echo "$labels" | sed 's/^"//;s/"$//')
  milestone=$(echo "$milestone" | sed 's/^"//;s/"$//')

  # Create the issue
  echo "Creating issue: $title"

  # Convert comma-separated labels to --label flags
  label_flags=""
  IFS=',' read -ra LABEL_ARRAY <<< "$labels"
  for label in "${LABEL_ARRAY[@]}"; do
    label_flags="$label_flags --label \"$label\""
  done

  # Create issue with gh CLI
  gh issue create \
    --repo "$REPO" \
    --title "$title" \
    --body "$body" \
    $label_flags \
    --milestone "$milestone"

  # Small delay to avoid rate limiting
  sleep 1
done
```

**Usage:**
```bash
chmod +x import-issues.sh
./import-issues.sh
```

### Method 2: Using Python Script

For more control and better CSV parsing:

```python
#!/usr/bin/env python3
# import_issues.py

import csv
import subprocess
import time

CSV_FILE = 'github-issues-import.csv'
REPO = 'kluth/synapse-vscode-extension'

with open(CSV_FILE, 'r', encoding='utf-8') as f:
    reader = csv.DictReader(f)

    for row in reader:
        title = row['title']
        body = row['body']
        labels = row['labels'].split(',')
        milestone = row['milestone']

        print(f"Creating issue: {title}")

        # Build gh command
        cmd = [
            'gh', 'issue', 'create',
            '--repo', REPO,
            '--title', title,
            '--body', body,
            '--milestone', milestone
        ]

        # Add labels
        for label in labels:
            cmd.extend(['--label', label.strip()])

        try:
            subprocess.run(cmd, check=True)
            print(f"✓ Created: {title}")
        except subprocess.CalledProcessError as e:
            print(f"✗ Failed: {title} - {e}")

        # Rate limiting delay
        time.sleep(1)

print("\nImport complete!")
```

**Usage:**
```bash
chmod +x import_issues.py
python3 import_issues.py
```

### Method 3: Manual Import Using GitHub API

If you prefer using curl or the GitHub API directly:

```bash
#!/bin/bash
# api-import.sh

GITHUB_TOKEN="your_github_token_here"
REPO_OWNER="kluth"
REPO_NAME="synapse-vscode-extension"
CSV_FILE="github-issues-import.csv"

# Read CSV and create issues
# Note: This requires jq for JSON processing
tail -n +2 "$CSV_FILE" | while IFS=, read -r title body labels milestone; do
  # Remove quotes
  title=$(echo "$title" | sed 's/^"//;s/"$//')
  body=$(echo "$body" | sed 's/^"//;s/"$//')
  labels=$(echo "$labels" | sed 's/^"//;s/"$//')
  milestone=$(echo "$milestone" | sed 's/^"//;s/"$//')

  # Get milestone number (you'll need to create milestones first)
  # This is simplified - you'd need to fetch milestone numbers

  # Create JSON payload
  json_payload=$(jq -n \
    --arg title "$title" \
    --arg body "$body" \
    --argjson labels "$(echo $labels | jq -R 'split(",")')" \
    '{title: $title, body: $body, labels: $labels}')

  # Create issue
  curl -X POST \
    -H "Authorization: token $GITHUB_TOKEN" \
    -H "Accept: application/vnd.github.v3+json" \
    "https://api.github.com/repos/$REPO_OWNER/$REPO_NAME/issues" \
    -d "$json_payload"

  sleep 1
done
```

## Important Prerequisites

Before importing issues, you need to:

### 1. Create Milestones

All 24 milestones must exist before importing. Use this script:

```bash
gh api repos/kluth/synapse-vscode-extension/milestones \
  -f title="Phase 1: Project Setup & Infrastructure" \
  -f due_on="2025-11-14T00:00:00Z" \
  -f description="Set up TypeScript project structure, testing framework, and development tools"

# Repeat for all 24 phases...
```

Or use the existing `create-all-github-issues.sh` script to create milestones.

### 2. Create Labels

All labels must exist. Create them with:

```bash
# Phase labels
gh label create "phase:setup" --color "0075ca" --description "Phase 1: Project Setup"
gh label create "phase:bootstrap" --color "0075ca" --description "Phase 2: Core Extension Bootstrap"
# ... etc

# TDD labels
gh label create "tdd:red" --color "d73a4a" --description "Write failing test first"
gh label create "tdd:green" --color "0e8a16" --description "Make test pass"
gh label create "tdd:refactor" --color "fbca04" --description "Improve code quality"

# Type labels
gh label create "type:enhancement" --color "a2eeef" --description "New feature"
gh label create "type:infrastructure" --color "d876e3" --description "Infrastructure and tooling"

# Priority labels
gh label create "priority:high" --color "d93f0b" --description "High priority"
gh label create "priority:medium" --color "fbca04" --description "Medium priority"
gh label create "priority:low" --color "0e8a16" --description "Low priority"
```

## Testing the Import

Before importing all 148 issues, test with a small subset:

1. Extract first 5 issues:
   ```bash
   head -n 6 github-issues-import.csv > test-import.csv
   ```

2. Modify your import script to use `test-import.csv`

3. Verify the issues are created correctly

4. If successful, proceed with full import

## Troubleshooting

### Issue: "Milestone not found"

**Solution**: Create all milestones first. Milestone titles must match exactly.

### Issue: "Label does not exist"

**Solution**: Create all labels before importing. Use the label creation script above.

### Issue: "Rate limit exceeded"

**Solution**:
- GitHub API allows 5,000 requests/hour for authenticated users
- Add delays between requests (`sleep 1` in scripts)
- Check rate limit status:
  ```bash
  gh api rate_limit
  ```

### Issue: CSV parsing errors

**Solution**:
- The body field contains newlines, which is valid CSV
- Use proper CSV parsing libraries (Python's csv module, not simple shell parsing)
- Ensure your CSV reader handles multi-line quoted fields

## Post-Import Checklist

After importing all issues:

- [ ] Verify all 148 issues are created
- [ ] Check that labels are applied correctly
- [ ] Verify milestone assignments
- [ ] Review first few issues for formatting
- [ ] Close any duplicate or test issues
- [ ] Set up GitHub Projects board
- [ ] Start Phase 1 development!

## Alternative: GitHub's Issue Import Feature

GitHub also has a built-in issue import feature, but it may not support CSV directly. You can:

1. Use GitHub's issue transfer feature
2. Use third-party tools like `github-issues-import`
3. Convert CSV to GitHub's JSON format

## Verification

After import, verify:

```bash
# Check total issue count
gh issue list --repo kluth/synapse-vscode-extension --limit 1000 | wc -l

# Should show 148 issues

# Check issues by milestone
gh issue list --repo kluth/synapse-vscode-extension --milestone "Phase 1: Project Setup & Infrastructure"

# Check issues by label
gh issue list --repo kluth/synapse-vscode-extension --label "priority:high"
```

## Support

If you encounter issues:

1. Check GitHub CLI documentation: https://cli.github.com/manual/
2. Review GitHub API docs: https://docs.github.com/en/rest
3. Verify your authentication and permissions
4. Check repository settings

---

**Happy importing! 🚀**

The CSV contains all 148 issues with detailed descriptions, acceptance criteria, labels, and milestone assignments ready for your Synapse VSCode Extension project.
