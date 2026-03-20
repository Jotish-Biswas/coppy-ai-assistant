function getSelectedText() {
  return window.getSelection().toString().trim();
}

let aiBubble = null;
let aiPanel = null;

let currentSession = {
  selectedText: "",
  messages: [],
  createdAt: null
};

function createBubble() {
  if (aiBubble) return aiBubble;

  aiBubble = document.createElement("button");
  aiBubble.innerText = "Explain";
  aiBubble.id = "copy-ai-bubble";
  aiBubble.style.display = "none";

  aiBubble.addEventListener("click", () => {
    const text = getSelectedText();
    if (!text) return;

    startOrResumeSession(text);
    openPanel();
    renderMessages();
    hideBubble();
  });

  document.body.appendChild(aiBubble);
  return aiBubble;
}

function startOrResumeSession(text) {
  const isNewSession = currentSession.selectedText !== text;

  if (isNewSession) {
    currentSession = {
      selectedText: text,
      createdAt: Date.now(),
      messages: [
        {
          role: "assistant",
          content: buildInitialExplanation(text)
        }
      ]
    };
  }
}

function buildInitialExplanation(text) {
  const shortText =
    text.length > 220 ? text.slice(0, 220) + "..." : text;

  return `You selected/copied this text:\n"${shortText}"\n\nAsk me anything about it. For example: "বাংলায় বল", "আরও সহজ করে বল", "example dao", or "main point ki?"`;
}

function showBubble() {
  const selection = window.getSelection();

  if (!selection || selection.rangeCount === 0) {
    hideBubble();
    return;
  }

  const text = selection.toString().trim();
  if (!text) {
    hideBubble();
    return;
  }

  const range = selection.getRangeAt(0);
  const rect = range.getBoundingClientRect();

  const bubble = createBubble();
  bubble.style.display = "block";
  bubble.style.top = `${window.scrollY + rect.bottom + 8}px`;
  bubble.style.left = `${window.scrollX + rect.right - 40}px`;
}

function hideBubble() {
  if (aiBubble) {
    aiBubble.style.display = "none";
  }
}

function createPanel() {
  if (aiPanel) return aiPanel;

  aiPanel = document.createElement("div");
  aiPanel.id = "copy-ai-panel";
  aiPanel.innerHTML = `
    <div id="copy-ai-header">
      <div id="copy-ai-title">AI Assistant</div>
      <button id="copy-ai-close">×</button>
    </div>

    <div id="copy-ai-selected-wrap">
      <div id="copy-ai-selected-label">Selected text</div>
      <div id="copy-ai-selected-text"></div>
    </div>

    <div id="copy-ai-messages"></div>

    <div id="copy-ai-input-wrap">
      <input id="copy-ai-input" type="text" placeholder="Ask a follow-up question..." />
      <button id="copy-ai-send">Ask</button>
    </div>
  `;

  document.body.appendChild(aiPanel);

  aiPanel.querySelector("#copy-ai-close").addEventListener("click", closePanel);
  aiPanel.querySelector("#copy-ai-send").addEventListener("click", handleAsk);
  aiPanel.querySelector("#copy-ai-input").addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      handleAsk();
    }
  });

  return aiPanel;
}

function openPanel() {
  const panel = createPanel();
  panel.style.display = "flex";

  const selectedTextEl = panel.querySelector("#copy-ai-selected-text");
  selectedTextEl.textContent = currentSession.selectedText || "";
}

function closePanel() {
  if (aiPanel) {
    aiPanel.style.display = "none";
  }
}

function renderMessages() {
  if (!aiPanel) return;

  const messagesEl = aiPanel.querySelector("#copy-ai-messages");
  messagesEl.innerHTML = "";

  currentSession.messages.forEach((message) => {
    const messageEl = document.createElement("div");
    messageEl.className = `copy-ai-message copy-ai-${message.role}`;
    messageEl.textContent = message.content;
    messagesEl.appendChild(messageEl);
  });

  messagesEl.scrollTop = messagesEl.scrollHeight;
}
///
async function handleAsk() {
  if (!aiPanel) return;

  const input = aiPanel.querySelector("#copy-ai-input");
  const question = input.value.trim();

  if (!question) return;
  if (!currentSession.selectedText) return;

  currentSession.messages.push({
    role: "user",
    content: question
  });

  currentSession.messages.push({
    role: "assistant",
    content: "Thinking..."
  });

  input.value = "";
  renderMessages();

  try {
    const response = await fetch("http://127.0.0.1:3000/explain", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        selectedText: currentSession.selectedText,
        messages: currentSession.messages.filter(
          (message) => message.content !== "Thinking..."
        )
      })
    });

    const data = await response.json();

    currentSession.messages[currentSession.messages.length - 1] = {
      role: "assistant",
      content: data.answer || "No response from server."
    };

    renderMessages();


///
} catch (error) {
  currentSession.messages[currentSession.messages.length - 1] = {
    role: "assistant",
    content: "Server error. Check browser console for exact error."
  };

  renderMessages();
  console.error("FETCH ERROR:", error);
}
}
////


function handleCopiedText(text) {
  if (!text) return;

  startOrResumeSession(text);
  openPanel();
  renderMessages();
  hideBubble();
}

document.addEventListener("mouseup", () => {
  setTimeout(() => {
    const text = getSelectedText();
    if (text) {
      showBubble();
    } else {
      hideBubble();
    }
  }, 10);
});

document.addEventListener("copy", () => {
  setTimeout(() => {
    const copiedText = getSelectedText();
    if (copiedText) {
      handleCopiedText(copiedText);
    }
  }, 10);
});

document.addEventListener("mousedown", (event) => {
  if (aiBubble && event.target === aiBubble) return;
  if (aiPanel && aiPanel.contains(event.target)) return;
  hideBubble();
});