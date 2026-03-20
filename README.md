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


````
# How to use this ?

Step-by-Step Setup Guide
# 1. Clone the repository
git clone https://github.com/YOUR_USERNAME/copy-ai-assistant.git
cd copy-ai-assistant
# 2. Install backend dependencies

Go to the server folder:

cd server
npm install
# 3. Create a .env file

Inside the server folder, create a file named .env

Example:

GEMINI_API_KEY=your_real_gemini_api_key_here
# 4. Start the backend server

Inside the server folder, run:

npm start

If everything is correct, you should see:

Server running on http://127.0.0.1:3000
# 5. Load the extension in Brave or Chrome

Open:

brave://extensions in Brave

or chrome://extensions in Chrome

Then:

Turn on Developer mode

Click Load unpacked

Select the project folder

# 6. Use the extension

Open a webpage

Select some text → an Explain button will appear

Or copy text → the AI panel will open automatically

Ask follow-up questions in the panel

.. যদি কাজ না করে তবে ব্রাউজার এর ওই ওয়েবসাইট এর জন্য শিল্ড অফ করে দেও <img width="42" height="40" alt="image" src="https://github.com/user-attachments/assets/bcae6530-9efa-4ad1-accf-4e846da4ce53" />। এড্রেস বার এর পাশে ই ব্রেভ শিল্ড থাকে 

