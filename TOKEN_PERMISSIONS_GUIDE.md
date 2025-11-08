# GitHub Token Permissions Guide

## 🔐 Issue: 403 Forbidden Errors

The current GitHub Personal Access Token lacks the required permissions to create issues, milestones, and labels.

## ✅ Solution: Create a New Token with Correct Permissions

### Step 1: Create a New Personal Access Token

1. **Go to GitHub Token Settings:**
   ```
   https://github.com/settings/tokens/new
   ```

2. **Configure the Token:**
   - **Name**: `Synapse VSCode Extension - Full Access`
   - **Expiration**: 90 days (or your preference)

3. **Select Required Permissions:**

   #### ✅ Repository Access (Select ALL):
   - ✅ **repo** (Full control of private repositories)
     - ✅ repo:status
     - ✅ repo_deployment
     - ✅ public_repo
     - ✅ repo:invite
     - ✅ security_events

   #### ✅ Additional Permissions:
   - ✅ **write:discussion** (if using GitHub Discussions)
   - ✅ **project** (if using GitHub Projects)

   **CRITICAL**: Make sure the main **"repo"** checkbox at the top is checked!

4. **Generate Token:**
   - Click "Generate token"
   - **IMPORTANT**: Copy the token immediately! You won't see it again.

### Step 2: Use the New Token

Once you have the new token, you can import the issues using one of these methods:

#### Method A: Using the Import Script

```bash
cd /home/user/synapse-vscode-extension

# Set the new token
export GH_PAT="your_new_token_here"

# Run the import script
python3 /tmp/import_issues.py
```

#### Method B: Using GitHub CLI (Recommended)

```bash
# Install GitHub CLI if not already installed
# Ubuntu/Debian: sudo apt install gh
# macOS: brew install gh

# Authenticate with GitHub CLI
gh auth login
# Choose: GitHub.com > HTTPS > Paste an authentication token
# Paste your new token

# Then use the gh CLI to create issues from CSV
# See CSV_IMPORT_GUIDE.md for detailed instructions
```

## 🔍 Verifying Token Permissions

To check if your token has the right permissions:

```bash
# Test token authentication
curl -H "Authorization: token YOUR_TOKEN" https://api.github.com/user

# Try creating a test label
curl -X POST \
  -H "Authorization: token YOUR_TOKEN" \
  -H "Accept: application/vnd.github.v3+json" \
  https://api.github.com/repos/kluth/synapse-vscode-extension/labels \
  -d '{"name":"test","color":"ff0000","description":"Test label"}'

# If successful, you'll see status 201
# If you still see 403, the token needs more permissions
```

## 📋 Alternative: Manual Import

If token issues persist, you can create issues manually:

### Option 1: Use the CSV as Reference
- Open `github-issues-import.csv`
- Create issues via GitHub web UI using the CSV data as reference
- 148 issues total - can be done incrementally

### Option 2: Use the Template
- Open `ISSUES_TEMPLATE.md`
- Copy issue content and create via GitHub web UI
- Issues are organized by phase for easy tracking

### Option 3: GitHub Import Feature
Some repositories have access to GitHub's bulk import feature:
1. Go to repository Settings
2. Look for "Import issues" option
3. Upload the CSV file

## 🚨 Common Permission Issues

### Issue: "Resource not accessible by personal access token"
**Cause**: Token missing "repo" scope
**Fix**: Create new token with full "repo" permissions

### Issue: "Not Found" (404)
**Cause**: Token doesn't have access to the repository
**Fix**: Ensure you're the repository owner or have write access

### Issue: Rate limiting
**Cause**: Too many API requests in short time
**Fix**: Script includes delays, but if you hit limits, wait 1 hour

## 💡 Best Practices

1. **Never commit tokens to git**
   - Use environment variables
   - Add tokens to `.gitignore` if stored in files

2. **Use minimal permissions needed**
   - For this task: `repo` scope is required
   - Can revoke/delete token after import is complete

3. **Set expiration dates**
   - Tokens should expire after a reasonable time
   - 90 days is a good default

4. **Rotate tokens regularly**
   - Create new tokens periodically
   - Delete old unused tokens

## 📞 Need Help?

If you continue to have issues:

1. Verify you have write access to the repository
2. Check GitHub's status page: https://www.githubstatus.com/
3. Try the GitHub CLI method instead of API
4. Fall back to manual creation using the templates

## ✅ Once Issues Are Imported

After successful import:

1. ✅ Verify all 148 issues were created
2. ✅ Check that labels are applied correctly
3. ✅ Verify milestones are assigned
4. ✅ Set up GitHub Projects board (optional)
5. ✅ Start development with Phase 1, Issue #1

---

**Token Template for Reference:**

```bash
# Save to ~/.bashrc or ~/.zshrc
export GH_PAT="github_pat_11..." # Your new token here

# Or set for current session only
export GH_PAT="github_pat_11..."
```

Good luck! 🚀
