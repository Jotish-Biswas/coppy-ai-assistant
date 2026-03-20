const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { GoogleGenerativeAI } = require("@google/generative-ai");

dotenv.config();

const app = express();
const PORT = 3000;

app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type"]
}));

app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.get("/", (req, res) => {
  res.json({ ok: true, message: "Server is running" });
});

app.post("/explain", async (req, res) => {
  try {
    const { selectedText, messages } = req.body;

    if (!selectedText || typeof selectedText !== "string") {
      return res.status(400).json({ answer: "No selected text provided." });
    }

    const safeMessages = Array.isArray(messages) ? messages : [];

    const conversationText = safeMessages
      .map((m) => `${m.role === "user" ? "User" : "Assistant"}: ${m.content}`)
      .join("\n");

    const prompt = `
You are a helpful browser-based AI study assistant.

The user selected/copied text from a webpage.
Your job:
- explain the selected text clearly
- answer follow-up questions based on the selected text
- keep the answer practical and easy to understand
- if the user asks in Bangla, answer in Bangla
- if the text looks like a coding problem, explain it like a tutor
- do not be overly verbose
- stay focused on the selected text and the follow-up chat

Selected text:
"""
${selectedText}
"""

Conversation so far:
${conversationText}

Now answer the user's latest question helpfully.
`;

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const answer = response.text();

    res.json({
      answer: answer || "No response from Gemini."
    });
  } catch (error) {
    console.error("GEMINI ERROR:", error);
    res.status(500).json({
      answer: "AI server error. Check backend terminal."
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://127.0.0.1:${PORT}`);
});