# Security at BuiltInPublic

Hey there! 👋🏻

We’re so glad you’re here, and we want to make sure BuiltInPublic is a safe and secure space for everyone building in public. Security is something we all share responsibility for, and your help goes a long way in making this project better for the entire community.

---

## 🛠 Found a Security Issue?

If you’ve discovered a vulnerability or something that doesn’t look quite right, we’d really appreciate it if you let us know privately.

**Please don’t open a public issue.**  
Instead, reach out to us at:

📧 **christinpmartin@gmail.com**

When reporting, include as much detail as you can:

- Impact & reproduction steps
- Suggested mitigation (optional)

---

## ⏱️ Response & Remediation SLAs

|  Severity  | Acknowledge | Fix Timeline |
| :--------: | :---------: | :----------: |
|  Critical  |   24 hrs    |    7 days    |
|    High    |   48 hrs    |   14 days    |
| Medium/Low |   72 hrs    |   30 days    |

---

## 🫱🏼‍🫲🏽 Our Disclosure Approach

We follow a responsible disclosure process:

1. You let us know privately.
2. We investigate and confirm the issue.
3. We collaborate on a fix.
4. Once resolved, we publish the patch and optionally credit you.

We’re all about community here. If you want to be credited, we’re happy to highlight your contribution in our release notes.

---

## 🔐 Secure Contributions

Helping us build BuiltInPublic? Amazing. Please take a look at our [CONTRIBUTORS.md](./CONTRIBUTORS.md#secure-coding-practices) to see our secure coding expectations.

### You don’t have to be a security expert, just keeping an eye out for common pitfalls helps a lot.

---

## 🔍 Local Security Checks

Before your PR, run:

# 1. Prettier

```bash
npx prettier . --check    # check formatting
npx prettier . --write    # auto-fix formatting
```

# 2. ESLint - Code Linting

```bash
npx eslint .              # find lint issues
npx eslint . --fix        # fix fixable ones
```

# 3. Gitleaks

```bash
npx gitleaks detect --source . --redact
```

# 4. CodeQL (optional)

```bash
npx codeql database create codeql-db --language=typescript
npx codeql database analyze codeql-db typescript-code-scanning.qls \
  --format=sarif-latest \
  --output=codeql-results.sarif
```

---

## 🧭 Supported Versions

We currently support the latest version of the `development` branch. Security fixes will be released for that version unless otherwise noted.

---

Thanks for being part of the community, and for helping us keep things safe for everyone.

— The BuiltInPublic Security Team
