#Why Did My App Fail?

A lightweight, rule-based **command-line debugging assistant** that explains *why* an error occurred and *how* to fix it — in plain English.

This tool is designed for developers who are tired of cryptic error messages and want quick, actionable explanations directly in the terminal.

---

## 🚀 Problem Statement

Developers frequently encounter runtime errors, build failures, and Git issues that:

* Are hard to understand at first glance
* Require searching multiple sources
* Interrupt development flow

Most tools only show **what** failed. This CLI focuses on explaining **why it failed** and **what to do next**.

---

## 💡 Solution Overview

`whyfail` analyzes error messages or log files using a **deterministic rule-based engine** and provides:

* Error category (Node.js, Git, etc.)
* Human-friendly root cause explanation
* Clear fix suggestions
* Confidence score

The architecture is intentionally designed to be **extensible**, with AI-assisted reasoning planned as a future enhancement.

---

## 🧠 How It Works

1. User provides an error message or log file
2. The input is normalized and scanned
3. Known error patterns are matched against rule definitions
4. Matches are **ranked by strength** to compute a confidence score
5. The best match is returned with explanation and fix
6. If no match is found, helpful next steps are suggested

---

## 📦 Features

* ✅ CLI-first, fast and lightweight
* ✅ Rule-based matching (reliable & deterministic)
* ✅ **Dynamic confidence scoring** based on match strength
* ✅ Category-based error classification (Node.js, Git, Network, Auth)
* ✅ Supports direct error text and log files
* ✅ **`--list` command to display supported error patterns**
* 🔮 Planned: AI-assisted guessing for unknown patterns

---

## 🛠️ Installation (Local)

```bash
npm install
npm link
```

---

## ▶️ Usage

### Analyze direct error text

```bash
whyfail "EADDRINUSE: address already in use"
```

### Analyze error from file

```bash
whyfail --file error.log
```

### List all supported error patterns

```bash
whyfail --list
```

---

## 📤 Sample Output

```
✔ Issue identified

Category: Node.js
Cause: The port your app is trying to use is already occupied.
Fix: Stop the running process or change the port number.
Confidence: 90%
```

---

## 🧩 Project Structure

```
why-my-app-failed/
├── bin/        # CLI entry point
├── rules/      # Error pattern definitions
├── utils/      # Matcher engine
├── README.md
```

---

## 🧪 Why This Project Stands Out

* Focuses on **developer reasoning**, not just tooling
* Uses a **deterministic rule engine** instead of blind AI calls
* Confidence scoring avoids misleading suggestions
* Transparent support via `--list` command
* Designed with clear future AI integration scope

---

## 🔮 Future Improvements

* AI-assisted fallback for unknown or weakly-matched errors
* Ranking and displaying multiple possible causes
* Online pattern updates
* Community-contributed rule sets
* Stack trace summarization

---

## 👤 Author

**Narendra Meshram**
Aspiring software engineer with a strong interest in building developer-focused tools.

---

## 📜 License

MIT
