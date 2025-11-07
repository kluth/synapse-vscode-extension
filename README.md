# Synapse VSCode Extension

A comprehensive, full-featured VSCode extension for the [Synapse Framework](https://github.com/kluth/synapse) - bringing 3 billion years of neural system evolution to your IDE.

## 🧠 About

The Synapse VSCode Extension provides rich IDE support for developing applications with the Synapse framework, which applies biological neural system principles to distributed software architecture.

## 🎯 Features (Planned)

This extension will provide:

### Core Development Features
- **IntelliSense** - Smart code completion for neurons, circuits, and connections
- **Code Snippets** - Quick scaffolding for all Synapse components
- **Type-Safe Navigation** - Go to Definition and Find All References
- **Real-time Diagnostics** - Linting and validation for circuit topology
- **Hover Documentation** - Rich inline docs with biological context

### Advanced Features
- **Circuit Visualization** - Interactive graph view of neural networks
- **Debugging Support** - Signal flow tracing and breakpoint integration
- **Scaffolding Commands** - Generate neurons, circuits, and glial cells
- **Task Runner** - Build, test, and run Synapse applications
- **Code Actions** - Quick fixes and refactoring tools
- **Project Explorer** - TreeView showing neurons, circuits, and glial cells

## 📋 Development Plan

This project follows a comprehensive 24-phase development plan with **148 fine-granular tasks**, including:

- **Phase 1-3**: Project setup, extension bootstrap, project detection
- **Phase 4-9**: Core IDE features (snippets, IntelliSense, diagnostics, scaffolding)
- **Phase 10-15**: Advanced features (visualization, debugging, refactoring)
- **Phase 16-18**: Testing, documentation, CI/CD
- **Phase 19-22**: Optimization, marketplace prep, release
- **Phase 23-24**: Post-release monitoring and advanced features

**Timeline**: November 2025 - February 2026

### Test-Driven Development (TDD)

All features are developed using strict TDD methodology:
- 🔴 **RED** - Write failing tests first
- 🟢 **GREEN** - Implement code to pass tests
- ♻️ **REFACTOR** - Improve code quality while keeping tests green

### Success Criteria
- ✅ >80% test coverage
- ✅ TypeScript strict mode (100% compliance)
- ✅ Extension activation < 1 second
- ✅ Bundle size < 5MB
- ✅ Cross-platform (Windows, macOS, Linux)

## 🚀 Getting Started

### For Contributors

#### 1. Create GitHub Issues

We have automation scripts to create all 148 issues and 24 milestones:

```bash
# Set your GitHub token (get from: https://github.com/settings/tokens/new)
export GH_PAT="your_github_token_here"

# Run the automated setup
./create-issues.sh
```

**Alternative methods:**
- Use GitHub CLI: `./create-issues-with-gh.sh`
- Manual creation: See `ISSUES_TEMPLATE.md`

**Detailed instructions**: See [SETUP_GITHUB_ISSUES.md](SETUP_GITHUB_ISSUES.md)

#### 2. View the Plan

- **All Issues**: [ISSUES_TEMPLATE.md](ISSUES_TEMPLATE.md) - Complete list of 148 tasks
- **Summary**: [GITHUB_ISSUES_SUMMARY.md](GITHUB_ISSUES_SUMMARY.md) - Overview and statistics
- **Setup Guide**: [SETUP_GITHUB_ISSUES.md](SETUP_GITHUB_ISSUES.md) - Detailed instructions

#### 3. Start Developing

Once issues are created, start with Phase 1: Project Setup & Infrastructure

```bash
# Issues #1-10 cover initial project setup
# Each issue has detailed acceptance criteria
# Follow TDD workflow for all features
```

## 📚 Documentation

| File | Description |
|------|-------------|
| [ISSUES_TEMPLATE.md](ISSUES_TEMPLATE.md) | Complete list of all 148 issues with details |
| [GITHUB_ISSUES_SUMMARY.md](GITHUB_ISSUES_SUMMARY.md) | Project overview and statistics |
| [SETUP_GITHUB_ISSUES.md](SETUP_GITHUB_ISSUES.md) | Setup guide with troubleshooting |

## 🛠️ Scripts

| Script | Description |
|--------|-------------|
| `create-issues.sh` | **Recommended** - Easy wrapper script using env variables |
| `create-all-github-issues.sh` | Full automation using GitHub REST API |
| `create-issues-with-gh.sh` | Alternative using GitHub CLI |

## 📊 Project Statistics

- **Total Issues**: 148 across 24 phases
- **Milestones**: 24 (one per phase)
- **Labels**: 32 (phases, TDD cycles, types, priorities)
- **Development Approach**: Test-Driven Development (TDD)
- **Testing Target**: >80% code coverage
- **Timeline**: ~3 months (Nov 2025 - Feb 2026)

## 🏗️ Development Phases

<details>
<summary><b>Phases 1-8: Foundation & Core Features</b></summary>

1. **Project Setup** (10 tasks) - TypeScript, testing, tooling
2. **Extension Bootstrap** (7 tasks) - Activation and commands
3. **Project Detection** (6 tasks) - Detect Synapse projects
4. **Code Snippets** (8 tasks) - All component templates
5. **IntelliSense** (6 tasks) - Smart code completion
6. **Hover Provider** (4 tasks) - Inline documentation
7. **Navigation** (5 tasks) - Go to def, find references
8. **Diagnostics** (7 tasks) - Linting and validation

</details>

<details>
<summary><b>Phases 9-16: Advanced Features</b></summary>

9. **Scaffolding** (9 tasks) - Code generation commands
10. **Visualization** (8 tasks) - Circuit graph viewer
11. **Debugging** (6 tasks) - Debug support
12. **Syntax Highlighting** (4 tasks) - TextMate grammar
13. **Task Provider** (5 tasks) - Build/run tasks
14. **Refactoring** (6 tasks) - Code actions
15. **TreeView** (5 tasks) - Project explorer
16. **Testing** (6 tasks) - Comprehensive test suite

</details>

<details>
<summary><b>Phases 17-24: Polish & Release</b></summary>

17. **Documentation** (6 tasks) - User & developer docs
18. **CI/CD** (8 tasks) - Automated pipeline
19. **Optimization** (5 tasks) - Bundle optimization
20. **Marketplace Prep** (5 tasks) - Publishing preparation
21. **Pre-Release Testing** (6 tasks) - Cross-platform testing
22. **Alpha Release** (5 tasks) - v0.1.0 launch
23. **Post-Release** (5 tasks) - Monitoring & feedback
24. **Advanced Features** (6 tasks) - Future enhancements

</details>

## 🧪 Testing Strategy

- **Unit Tests**: Jest with ts-jest (>80% coverage target)
- **Integration Tests**: @vscode/test-electron
- **End-to-End Tests**: Full extension testing
- **CI/CD**: Automated testing on all commits
- **Coverage Reporting**: Codecov integration

## 📦 Tech Stack

- **Language**: TypeScript (strict mode)
- **Testing**: Jest + @vscode/test-electron
- **Bundler**: esbuild (for fast builds)
- **Linting**: ESLint + @typescript-eslint
- **Formatting**: Prettier
- **CI/CD**: GitHub Actions

## 🤝 Contributing

Contributions are welcome! Here's how to get started:

1. Fork the repository
2. Create issues using the automation scripts
3. Pick an issue from Phase 1 or your area of expertise
4. Follow the TDD workflow (RED-GREEN-REFACTOR)
5. Ensure all tests pass and coverage is maintained
6. Submit a pull request

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details

## 🔗 Related Projects

- [Synapse Framework](https://github.com/kluth/synapse) - The framework this extension supports
- [VSCode Extension API](https://code.visualstudio.com/api) - Official VSCode extension docs

## 🎯 Roadmap

- **Nov 2025**: Foundation & Core Features (Phases 1-8)
- **Dec 2025**: Advanced Features & Polish (Phases 9-19)
- **Dec 31, 2025**: Alpha Release v0.1.0 (Phase 22)
- **Jan-Feb 2026**: Post-release & Advanced Features (Phases 23-24)

---

**Status**: 🚧 Planning Phase - Issues and milestones being created

**Next Steps**: Run `./create-issues.sh` to set up the GitHub project board!
