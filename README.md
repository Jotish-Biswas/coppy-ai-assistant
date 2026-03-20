# coppy-ai-assistant


# Copy AI Assistant

A simple Brave/Chrome extension that explains selected or copied text using Gemini AI.

This project is useful for:
- LeetCode problem explanations
- Quick concept clarification
- Follow-up questions on copied text
- Learning technical content in a simpler way

---

## Features

- Select text and get an **Explain** button
- Copy text and automatically open an AI chat panel
- Ask follow-up questions about the same selected text
- Uses a local backend server for secure Gemini API calls
- Works well for study and coding use cases

---

## Who is this for?

This project is for:
- students
- programmers
- LeetCode learners
- anyone who wants instant explanation of copied text

---

## How it works

The project has 2 parts:

1. **Browser extension**
   - Detects selected/copied text
   - Shows a button or panel
   - Sends the selected text to the backend

2. **Backend server**
   - Receives the selected text and follow-up messages
   - Calls Gemini API securely
   - Returns the AI response

---

## Tech Stack

- Brave / Chrome Extension
- JavaScript
- Node.js
- Express
- Gemini API

---

## Project Structure

```text
copy-ai-assistant/
  manifest.json
  content.js
  styles.css
  server/
    package.json
    index.js
    .env
