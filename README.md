# Playwright 101 Assessment - TypeScript

TypeScript Playwright test automation project running on LambdaTest HyperExecute cloud grid.

## Project Structure

```
playwright-101-typescript/
├── tests/
│   └── scenarios.spec.ts           # 3 test scenarios (TypeScript)
├── playwright.config.ts            # Playwright configuration
├── tsconfig.json                   # TypeScript configuration
├── package.json                    # NPM dependencies
├── hyperexecute.yaml               # HyperExecute config (matrix, secrets, artifacts)
├── .github/
│   └── workflows/
│       └── hyperexecute.yml        # GitHub Actions CI pipeline
├── .gitignore                      # Git exclusions
└── README.md                       # This file
```

## Test Scenarios

### 1. Simple Form Demo
- Navigate to TestMu AI Selenium Playground
- Click "Simple Form Demo"
- Verify URL contains "simple-form-demo"
- Enter "Welcome to TestMu AI" in the message text box
- Click "Get Checked Value"
- Validate the message appears in the "Your Message:" section

### 2. Drag & Drop Sliders
- Navigate to "Drag & Drop Sliders"
- Locate slider with default value 15
- Set slider value to 95 using evaluate()
- Validate the range value shows 95

### 3. Input Form Submit
- Click "Submit" without filling fields and assert HTML5 validation message
- Fill all form fields (name, email, password, company, website, address, city, state, zip)
- Select "United States" from the Country drop-down
- Submit form and validate success message

## Setup

### Prerequisites
- **Node.js** 18+ - [Download](https://nodejs.org/)
- **npm** (comes with Node.js)

### Installation

```bash
npm install
```

## Running Tests Locally

```bash
# Headless (default)
npm test

# Specific browser
npm run test:chromium
npm run test:firefox

# Interactive (headed)
npm run test:headed

# Debug mode
npm run test:debug
```

## HyperExecute Cloud Execution

### Matrix Strategy
Tests run in parallel across **4 browser/OS combinations**:

| OS      | Browser  |
|---------|----------|
| Windows | Chromium |
| Windows | Firefox  |
| Linux   | Chromium |
| Linux   | Firefox  |

### HyperExecute Features Used

| Feature | Description |
|---------|-------------|
| **Artifacts Management** | Collects `playwright-report/` and `test-results/` from all environments into downloadable artifacts on the dashboard |
| **Secret Management** | `TEST_EMAIL` and `TEST_PASSWORD` are stored in the HyperExecute Secrets vault and injected at runtime |
| **Environment Variables** | Non-sensitive config (`TEST_WEBSITE`, `TEST_NAME`, `TEST_COMPANY`, etc.) injected via the `env` block |
| **Pre Steps** | `npm install` and `npx playwright install --with-deps` run before tests |
| **Post Steps** | Confirmation echo after test execution |
| **GitHub Actions** | CI pipeline triggers HyperExecute on push/PR to main branch |

### Prerequisites for HyperExecute
1. A [LambdaTest](https://www.lambdatest.com/) account
2. Add secrets in the **HyperExecute Dashboard → Secrets Management**:
   - `TEST_EMAIL`
   - `TEST_PASSWORD`

### Run via CLI

```powershell
# Download HyperExecute CLI (Windows)
Invoke-WebRequest -Uri "https://downloads.lambdatest.com/hyperexecute/windows/hyperexecute.exe" -OutFile "hyperexecute.exe"

# Execute tests
.\hyperexecute.exe --user <LT_USERNAME> --key <LT_ACCESS_KEY> --config hyperexecute.yaml
```

### Run via GitHub Actions
1. Add repository secrets in **Settings → Secrets and variables → Actions**:
   - `LT_USERNAME`
   - `LT_ACCESS_KEY`
2. Push to `main`/`master` or open a PR — the workflow triggers automatically.

## Resources

- [Playwright TypeScript Guide](https://playwright.dev/docs/intro)
- [HyperExecute Documentation](https://www.lambdatest.com/support/docs/hyperexecute-cli/)
- [HyperExecute YAML Reference](https://www.lambdatest.com/support/docs/deep-dive-into-hyperexecute-yaml/)
- [HyperExecute Secrets Management](https://www.lambdatest.com/support/docs/hyperexecute-environment-variable-setup/)
- [Node.js Documentation](https://nodejs.org/docs/)
