# 🫱🏼‍🫲🏽 Contributing to BuiltInPublic

First off, thank you for your interest in contributing to BuiltInPublic! This is a community-driven project built on collaboration, curiosity, and a shared love for building in public.

Whether you're submitting a bug fix, feature, documentation improvement, or helping with security, we're excited to have you here.

---

## 🚀 How to Get Started

1. **Clone the `development` branch of this repo**
2. **Create a new branch** (`git checkout -b my-branch`)
3. **Make your changes**
4. **Commit with clear messages**
5. **Push to your branch**
6. **Submit a pull request to the `development` branch**

Keep your PR focused and descriptive. If you're fixing a bug or adding a feature, include context so we understand what you're solving.

---

## ✨ Code Style & Practices

- Use consistent formatting (Prettier, ESLint, etc.)
- Break large features into small, reviewable chunks
- Remove commented-out code and unrelated changes
- Write meaningful commit messages (e.g., `fix: sanitize user input in form`)

---

## 🔐 Secure Coding Practices

We care deeply about security and ask that you keep the following principles in mind when contributing:

### Input Validation & Sanitization

- **Character Encoding:**  
  Always specify and enforce UTF-8 for all input sources to prevent encoding-related attacks.

- **Validation Techniques:**  
  Use _allow-list validation_ for input—only accept what you expect. Check data types, ranges, and lengths before processing.

- **Sanitize Outputs:**  
  Escape and sanitize user input when outputting it to the DOM, APIs, command line, or database.

### ⚙️ General Secure Development Practices

- **Secrets Handling:**  
  Never commit API keys, tokens, or sensitive info. Use `.env` files and ensure `.env` is in `.gitignore`.

- **Avoid Injection:**  
  Use parameterized queries and avoid string concatenation in SQL or shell commands.

- **Authentication & Authorization:**  
  If your changes interact with user accounts or permissions, think about least privilege and access control.

- **Log Carefully:**  
  Don’t log anything sensitive like passwords, tokens, or personally identifiable data.

### 👏🏻 Bonus Points

We love when contributors go the extra mile by:

- Adding unit tests
- Updating related documentation
- Leaving inline comments explaining tricky logic

---

## 🛡️ Reporting Security Issues

Please do **not** open GitHub issues for anything security-related. Instead, follow our [security policy](./SECURITY.md) to report vulnerabilities responsibly.

---

## ❤️ Acknowledgments

All contributors, whether you write code, spot bugs, suggest ideas, or help with security, make this project better. Thank you!

---

### **We’re excited to build BuiltInPublic with you!**
