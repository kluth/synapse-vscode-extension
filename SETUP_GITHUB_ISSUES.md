# GitHub Issues Setup Guide

This guide explains how to create all 148 GitHub issues and 24 milestones for the Synapse VSCode Extension development plan.

## 📋 Overview

The development plan consists of:
- **24 Milestones** (one per development phase)
- **148 Issues** (fine-granular tasks across all phases)
- **32 Labels** (phases, TDD cycles, types, priorities)

## 🚀 Quick Start (Recommended Method)

### Method 1: Using GitHub CLI (gh) - RECOMMENDED

This is the most reliable method as it uses GitHub's official CLI.

#### Step 1: Install GitHub CLI

**On Ubuntu/Debian:**
```bash
sudo apt install gh
```

**On macOS:**
```bash
brew install gh
```

**On Windows:**
```powershell
winget install --id GitHub.cli
```

Or download from: https://cli.github.com/

#### Step 2: Authenticate

```bash
gh auth login
```

Follow the prompts to authenticate with your GitHub account.

#### Step 3: Run the Script

```bash
cd /home/user/synapse-vscode-extension
chmod +x create-issues-with-gh.sh
./create-issues-with-gh.sh
```

**Note:** The current script creates the first 10 issues as an example. To create all 148 issues, you can edit the script or create issues manually using the ISSUES_TEMPLATE.md file.

---

### Method 2: Using GitHub Personal Access Token (PAT)

This method uses the GitHub REST API directly.

#### Step 1: Create a Personal Access Token

1. Go to: https://github.com/settings/tokens/new
2. Give it a descriptive name: "Synapse VSCode Extension Issues"
3. Set expiration (recommend: 90 days)
4. **Required Permissions:**
   - ✅ **repo** (Full control of private repositories)
     - ✅ repo:status
     - ✅ repo_deployment
     - ✅ public_repo
     - ✅ repo:invite
     - ✅ security_events
   - ✅ **Issues** (Read and write)
   - ✅ **Pull requests** (Read and write - optional but recommended)

5. Click "Generate token"
6. **IMPORTANT:** Copy the token immediately (you won't see it again!)

#### Step 2: Run the Script with Token

```bash
cd /home/user/synapse-vscode-extension
chmod +x create-all-github-issues.sh
./create-all-github-issues.sh YOUR_GITHUB_TOKEN_HERE
```

Replace `YOUR_GITHUB_TOKEN_HERE` with your actual token.

**Example:**
```bash
./create-all-github-issues.sh github_pat_11ABCDEFG1234567890...
```

#### Step 3: Verify Creation

After the script completes, visit:
- Issues: https://github.com/kluth/synapse-vscode-extension/issues
- Milestones: https://github.com/kluth/synapse-vscode-extension/milestones

---

### Method 3: Manual Creation Using Template

If automation doesn't work, you can create issues manually using the template file.

#### Step 1: Open Template

Open `ISSUES_TEMPLATE.md` - this contains all 148 issues with full details.

#### Step 2: Create Milestones

1. Go to: https://github.com/kluth/synapse-vscode-extension/milestones/new
2. Create each of the 24 milestones listed in the template
3. Set due dates as specified

#### Step 3: Create Labels

1. Go to: https://github.com/kluth/synapse-vscode-extension/labels
2. Create all 32 labels listed in the template with correct colors

#### Step 4: Create Issues

1. Go to: https://github.com/kluth/synapse-vscode-extension/issues/new
2. Copy each issue from ISSUES_TEMPLATE.md
3. Set appropriate labels and milestone
4. Create the issue
5. Repeat for all 148 issues

**Tip:** Use GitHub's bulk import feature if available.

---

## 📊 Files Included

| File | Description | Size |
|------|-------------|------|
| `create-all-github-issues.sh` | Complete automation script (API method) | 70KB |
| `create-issues-with-gh.sh` | GitHub CLI method (first 10 issues) | 12KB |
| `ISSUES_TEMPLATE.md` | Complete list of all 148 issues | 66KB |
| `GITHUB_ISSUES_SUMMARY.md` | Overview and statistics | 8KB |
| `SETUP_GITHUB_ISSUES.md` | This setup guide | 4KB |

---

## 🏷️ Labels Reference

### Phase Labels (24)
- `phase:setup` - Phase 1: Project Setup & Infrastructure
- `phase:bootstrap` - Phase 2: Core Extension Bootstrap
- `phase:detection` - Phase 3: Project Detection
- `phase:snippets` - Phase 4: Code Snippets
- `phase:intellisense` - Phase 5: IntelliSense
- `phase:hover` - Phase 6: Hover Provider
- `phase:navigation` - Phase 7: Navigation
- `phase:diagnostics` - Phase 8: Diagnostics
- `phase:scaffolding` - Phase 9: Scaffolding
- `phase:visualization` - Phase 10: Visualization
- `phase:debugging` - Phase 11: Debugging
- `phase:syntax` - Phase 12: Syntax Highlighting
- `phase:tasks` - Phase 13: Task Provider
- `phase:refactoring` - Phase 14: Refactoring
- `phase:treeview` - Phase 15: TreeView
- `phase:testing` - Phase 16: Testing
- `phase:docs` - Phase 17: Documentation
- `phase:ci-cd` - Phase 18: CI/CD
- `phase:optimization` - Phase 19: Optimization
- `phase:marketplace` - Phase 20: Marketplace
- `phase:pre-release` - Phase 21: Pre-Release
- `phase:release` - Phase 22: Release
- `phase:monitoring` - Phase 23: Monitoring
- `phase:advanced` - Phase 24: Advanced Features

### TDD Cycle Labels (3)
- `tdd:red` 🔴 - Write failing test first
- `tdd:green` 🟢 - Implement code to pass test
- `tdd:refactor` ♻️ - Improve code quality

### Type Labels (2)
- `type:enhancement` - New features
- `type:infrastructure` - Tooling and setup

### Priority Labels (3)
- `priority:high` - Critical tasks
- `priority:medium` - Important tasks
- `priority:low` - Nice-to-have tasks

---

## 📅 Milestone Timeline

| Milestone | Due Date | Issues |
|-----------|----------|--------|
| Phase 1: Setup | Nov 14, 2025 | 10 |
| Phase 2: Bootstrap | Nov 16, 2025 | 7 |
| Phase 3: Detection | Nov 18, 2025 | 6 |
| Phase 4: Snippets | Nov 20, 2025 | 8 |
| Phase 5: IntelliSense | Nov 22, 2025 | 6 |
| Phase 6: Hover | Nov 24, 2025 | 4 |
| Phase 7: Navigation | Nov 26, 2025 | 5 |
| Phase 8: Diagnostics | Nov 28, 2025 | 7 |
| Phase 9: Scaffolding | Nov 30, 2025 | 9 |
| Phase 10: Visualization | Dec 3, 2025 | 8 |
| Phase 11: Debugging | Dec 5, 2025 | 6 |
| Phase 12: Syntax | Dec 7, 2025 | 4 |
| Phase 13: Tasks | Dec 9, 2025 | 5 |
| Phase 14: Refactoring | Dec 11, 2025 | 6 |
| Phase 15: TreeView | Dec 13, 2025 | 5 |
| Phase 16: Testing | Dec 15, 2025 | 6 |
| Phase 17: Documentation | Dec 17, 2025 | 6 |
| Phase 18: CI/CD | Dec 19, 2025 | 8 |
| Phase 19: Optimization | Dec 21, 2025 | 5 |
| Phase 20: Marketplace | Dec 23, 2025 | 5 |
| Phase 21: Pre-Release | Dec 26, 2025 | 6 |
| Phase 22: Release | Dec 31, 2025 | 5 |
| Phase 23: Monitoring | Jan 7, 2026 | 5 |
| Phase 24: Advanced | Feb 1, 2026 | 6 |

---

## 🔧 Troubleshooting

### Issue: "Resource not accessible by personal access token"

**Cause:** Token doesn't have required permissions.

**Solution:**
1. Go to https://github.com/settings/tokens
2. Find your token
3. Click "Regenerate token" or create a new one
4. Ensure these permissions are checked:
   - ✅ **repo** (Full control)
   - ✅ **Issues: Read and write**
5. Copy the new token
6. Run the script again with the new token

### Issue: "gh: command not found"

**Cause:** GitHub CLI is not installed.

**Solution:**
```bash
# Ubuntu/Debian
sudo apt install gh

# macOS
brew install gh

# Or download from: https://cli.github.com/
```

### Issue: "Failed to create milestone"

**Cause:** Milestone might already exist or lack permissions.

**Solution:**
- Check existing milestones: https://github.com/kluth/synapse-vscode-extension/milestones
- Delete duplicates if needed
- Ensure you have write access to the repository

### Issue: Rate Limiting

**Cause:** GitHub API rate limits (5,000 requests/hour for authenticated users).

**Solution:**
- The scripts include delays between requests
- Wait an hour if you hit the limit
- Check rate limit status:
```bash
curl -H "Authorization: token YOUR_TOKEN" https://api.github.com/rate_limit
```

---

## 📈 Using GitHub Projects

After creating issues, organize them using GitHub Projects:

1. Go to: https://github.com/kluth/synapse-vscode-extension/projects
2. Create a new project: "Synapse VSCode Extension Development"
3. Choose "Board" view
4. Add columns: "Backlog", "Ready", "In Progress", "Review", "Done"
5. Add all issues to the project
6. Drag issues to appropriate columns as you work

---

## ✅ Next Steps

After creating all issues:

1. **Review Issues** - Check that all issues are created correctly
2. **Assign Milestones** - Ensure each issue is in the right milestone
3. **Set Up Project Board** - Create GitHub Project for tracking
4. **Start Phase 1** - Begin with project setup tasks
5. **Follow TDD Workflow** - RED → GREEN → REFACTOR for each feature

---

## 📚 Additional Resources

- [VSCode Extension API](https://code.visualstudio.com/api)
- [VSCode Extension Guidelines](https://code.visualstudio.com/api/references/extension-guidelines)
- [GitHub REST API](https://docs.github.com/en/rest)
- [GitHub CLI Manual](https://cli.github.com/manual/)
- [Synapse Framework](https://github.com/kluth/synapse)

---

## 🎯 Success Criteria

You'll know the setup is successful when:

- ✅ 24 milestones are created with correct dates
- ✅ All 32 labels are created with correct colors
- ✅ All 148 issues are created with proper details
- ✅ Each issue is assigned to the correct milestone
- ✅ Each issue has appropriate labels
- ✅ You can view the project board with all tasks

---

## 💡 Tips

1. **Start Small** - Test with Phase 1 (10 issues) first
2. **Use Automation** - Prefer GitHub CLI over manual creation
3. **Track Progress** - Update issue status regularly
4. **Follow TDD** - Respect the RED-GREEN-REFACTOR cycle
5. **Stay Organized** - Use labels and milestones consistently
6. **Document Changes** - Update CHANGELOG.md as you complete phases

---

## 🤝 Need Help?

If you encounter issues:
1. Check the troubleshooting section above
2. Verify your token permissions
3. Review the GitHub API documentation
4. Check rate limits: https://api.github.com/rate_limit
5. Open an issue in the repository

---

**Happy coding! 🚀**
